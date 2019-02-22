import { Repository, Module, Interface, Property, User, Json, Dto, Enum, Type } from "../models";
import { TYPES, SCOPES } from "../models/bo/property";
import * as md5 from 'md5'
import * as querystring from 'querystring'
import * as rp from 'request-promise'
import { trimEnd } from './util';
const isMd5 = require('is-md5')

export default class MigrateService {
  public static DTOreg: RegExp = /DTO\b/i;
  public static Defaultreg: RegExp = /\bString\b|\bNumber\b|\bObject\b|\bArray\b|\bLong\b|\bInteger\b|\bDouble\b|\bList\b/i;
  public static async importRepoFromRAP1ProjectData(orgId: number, curUserId: number, projectData: any): Promise<boolean> {
    if (!projectData || !projectData.id || !projectData.name) return false
    let pCounter = 1
    let mCounter = 1
    let iCounter = 1
    const repo = await Repository.create({
      name: projectData.name,
      description: projectData.introduction,
      visibility: true,
      ownerId: curUserId,
      creatorId: curUserId,
      organizationId: orgId,
    })
    for (const module of projectData.moduleList) {
      const mod = await Module.create({
        name: module.name,
        description: module.introduction,
        priority: mCounter++,
        creatorId: curUserId,
        repositoryId: repo.id
      })
      for (const page of module.pageList) {
        for (const action of page.actionList) {
          const itf = await Interface.create({
            moduleId: mod.id,
            name: `${page.name}-${action.name}`,
            description: action.description,
            url: action.requestUrl || '',
            priority: iCounter++,
            creatorId: curUserId,
            repositoryId: repo.id,
            method: getMethodFromRAP1RequestType(+action.requestType)
          })
          for (const p of action.requestParameterList) {
            await processParam(p, SCOPES.REQUEST)
          }
          for (const p of action.responseParameterList) {
            await processParam(p, SCOPES.RESPONSE)
          }
          async function processParam(p: OldParameter, scope: SCOPES, parentId?: number) {
            const RE_REMARK_MOCK = /@mock=(.+)$/
            const ramarkMatchMock = RE_REMARK_MOCK.exec(p.remark)
            const remarkWithoutMock = p.remark.replace(RE_REMARK_MOCK, '')
            const name = p.identifier.split('|')[0]
            let rule = p.identifier.split('|')[1] || ''
            let type = (p.dataType || 'string').split('<')[0] // array<number|string|object|boolean> => Array
            type = type[0].toUpperCase() + type.slice(1) // foo => Foo
            let value = (ramarkMatchMock && ramarkMatchMock[1]) || ''
            if (/^function/.test(value)) type = 'Function' // @mock=function(){} => Function
            if (/^\$order/.test(value)) { // $order => Array|+1
              type = 'Array'
              rule = '+1'
              let orderArgs = /\$order\((.+)\)/.exec(value)
              if (orderArgs) value = `[${orderArgs[1]}]`
            }
            let description = []
            if (p.name) description.push(p.name)
            if (p.remark && remarkWithoutMock) description.push(remarkWithoutMock)

            const pCreated = await Property.create({
              scope,
              name,
              rule,
              value,
              type,
              description: `${p.remark}${p.name ? ', ' + p.name : ''}`,
              priority: pCounter++,
              interfaceId: itf.id,
              creatorId: curUserId,
              moduleId: mod.id,
              repositoryId: repo.id,
              parentId: parentId || -1,
            })
            for (const subParam of p.parameterList) {
              processParam(subParam, scope, pCreated.id)
            }
          }
        }
      }
    }
    return true
  }

  public static async importRepoFromProjectData(orgId: number, curUserId: number, projectData: any, dJson: any): Promise<boolean> {
    if (!projectData || !projectData.name) return false
    let pCounter = 1
    let mCounter = 1
    let iCounter = 1
    const repo = await Repository.create({
      name: projectData.name,
      description: projectData.description,
      visibility: true,
      ownerId: curUserId,
      creatorId: curUserId,
      organizationId: orgId,
      url: trimEnd(projectData.url, '/')
    })
    await Dto.update({
      json: dJson.dataValues.json,
      creatorId: curUserId,
      repositoryId: repo.id
    }, { where: { id: dJson.dataValues.id } });
    for (const module of projectData.modules) {
      const mod = await Module.create({
        name: module.name,
        description: module.description,
        priority: mCounter++,
        creatorId: curUserId,
        repositoryId: repo.id,
      })
      for (const typeList of module.types) {
        const typ = await Type.create({
          name: typeList.name,
          creatorId: curUserId,
          repositoryId: repo.id,
          moduleId: mod.id,
        })
        for (const page of typeList.interfaces) {
          const requireUrl = repo.url + page.url;
          const itf = await Interface.create({
            moduleId: mod.id,
            typeId: typ.id,
            name: `${page.name}`,
            description: page.description,
            url:  requireUrl || '',
            priority: iCounter++,
            creatorId: curUserId,
            repositoryId: repo.id,
            method: page.method
          })
          for (const action of page.properties) {
            await processParam(action, action.scope);
          }
          async function processParam(p: any, scope: any, parentId?: number) {
          const name = p.name;
          let rule = '';
          let type = (p.type || 'string').split('<')[0] // array<number|string|object|boolean> => Array
          type = type && (type[0].toUpperCase() + type.slice(1)) // foo => Foo
          // console.log(p.type);
          if (p.type === 'Integer' || p.type === 'Long') {
            type = TYPES.NUMBER;
          }
          let value = ''
          if (/^function/.test(value)) type = 'Function' // @mock=function(){} => Function
          if (/^\$order/.test(value)) { // $order => Array|+1
            type = 'Array'
            rule = '+1'
            let orderArgs = /\$order\((.+)\)/.exec(value)
            if (orderArgs) value = `[${orderArgs[1]}]`
          }
          let description = []
          if (p.name) description.push(p.name)
          let request = {};
          if (scope === SCOPES.REQUEST) {
            request = {
              scope,
              name,
              rule,
              value,
              type,
              pos: p.pos,
              description: `${p.description}`,
              priority: pCounter++,
              interfaceId: itf.id,
              creatorId: curUserId,
              moduleId: mod.id,
              typeId: typ.id,
              repositoryId: repo.id,
              parentId: parentId || -1,
              required: p.required,
            };
          } else {
            request = {
              scope,
              name,
              rule,
              value,
              type,
              description: `${p.description}`,
              priority: pCounter++,
              interfaceId: itf.id,
              creatorId: curUserId,
              moduleId: mod.id,
              typeId: typ.id,
              repositoryId: repo.id,
              parentId: parentId || -1,
              required: p.required,
            };
          }
          const pCreated = await Property.create(request);
          // 子请求列表
          if (p.parameterList && p.parameterList.length > 0) {
            for (const subParam of p.parameterList) {
              processParam(subParam, scope, pCreated.id)
            }
          }
          }
        }
      }
    }
    return true
  }
  public static checkAndFix(): void {
    // console.log('checkAndFix')
    // this.checkPasswordMd5().then()
  }

  static async checkPasswordMd5() {
    console.log('checkPasswordMd5')
    const users = await User.findAll()
    if (users.length === 0 || isMd5(users[0].password)) {
      console.log('  users empty or md5 check passed')
      return
    }
    for (const user of users) {
      if (!isMd5(user.password)) {
        user.password = md5(md5(user.password))
        await user.save()
        console.log(`handle user ${user.id}`)
      }
    }
  }

  public static async onReadTopic(cJson: any): Promise<any> {
    let json = cJson;
    for (const mod of json.modules) {
      for (const type of mod.types) {
        for (const itf of type.interfaces) {
          let properties = [];
          properties.push({
            "scope": "response",
            "type": itf.properties,
            "description": itf.name
          });
          itf.properties = properties;
        }
      }
    }
    return json;
  }

  public static async onReadType(tJson: any, cJson: any): Promise<any> {
    let cNewJson = await this.onReadTopic(cJson);
    let json = tJson;
    json.modules = [{
      name: '默认',
      types: tJson.modules
    }, {
      name: cJson.name,
      description: cJson.description,
      types: (cNewJson as any).modules
    }];
    return json;
  }

  public static async onReadAction(eJson: any, a: any): Promise<any> {
    let action: any = a;
    let type = MigrateService.DTOreg.test(a.type);
    switch (a.scope) {
      case SCOPES.REQUEST:
        if (type) {
          action.itemType = a.type
          action.type = TYPES.OBJECT
        } else if (a.type === "Integer") {
          action.description = await this.onReadDes(eJson, a.description)
        }
        break;
      default:
        if (type && (a.type === 'ListDTO')) {
          action.type = TYPES.ARRAY
        } else if (type && (a.type !== 'ListDTO')) {
          action.itemType = a.type
          action.type = TYPES.OBJECT
        }
        break;
    }
    return action;
  }

  public static async onReadDes(eJson: any, type: any): Promise<any> {
    let description: any;
    let etype = eJson[type] || [];
    etype.map((item: any) => {
      description = description ? description + ` ${item.id}:${item.description}` : `${item.id}:${item.description}`;
    })
    return description;
  }

  public static async onReadProper(dJson: any, page: any): Promise<any> {
    let properties: any = [];
    let description: string;
    let newPage = page;
    let djson = dJson;
    if (newPage.request && newPage.request.length > 0) {
      newPage.request.map((i: any) => {
        let description;
        if (MigrateService.DTOreg.test(i.type)) {
          description = `${i.description} ${i.type}`
        } else {
          description = i.description
        }
        properties.push({ "scope": "request", ...i, description })
      });
    }
    if (newPage.response && newPage.response.dataType && djson[newPage.response.dataType] && djson[newPage.response.dataType].length > 0) {
      djson[newPage.response.dataType].map((i: any) => {
        return i.name !== 'data' && properties.push({ "scope": "response", ...i })
      })
      // if (!(djson[newPage.response.dataType][0].id)) {
      //   djson[newPage.response.dataType].unshift({
      //     id: -1, type: TYPES.OBJECT
      //   })
      // }
      if (!newPage.response.data.description) {
        if (MigrateService.DTOreg.test(newPage.response.data.itemType)) {
          description = newPage.response.data.itemType;
        }
      } else {
        description = newPage.response.data.description;
      }
      properties.push({
        ...newPage.response.data,
        "name": "data",
        "description": description ? description : '',
      })
    }
    if (newPage.request || newPage.response) {
      delete newPage.request;
      delete newPage.response;
    }
    newPage.properties = properties;
    return {newPage: newPage, djson: djson};
  }

  public static async onReadJson(tJson: any, dJson?: any, eJson?: any): Promise<any> {
    let json = tJson;
    let djson = dJson;
    for (const module of json.modules) {
      for ( const typ of module.types) {
        for (const pages of typ.interfaces) {
          const page = await this.onReadProper(djson, pages)
          djson = page.djson;
          for (const a of page.newPage.properties) {
            let action = await this.onReadAction(eJson, a)
            if (action.itemType) {
              if (!djson) return false;
              async function processParam (parameterList: Array<any>, parameterData: any, scope: String): Promise<any> {
                let description: String;
                let type: any;
                let typeDTO = MigrateService.DTOreg.test(parameterData.itemType);
                let typeDefault = MigrateService.Defaultreg.test(parameterData.itemType);
                if (!(parameterData.id)) {
                  if (typeDefault) {
                    type = parameterData.itemType;
                    description = parameterData.description;
                    parameterList.push({
                      scope: scope,
                      name: parameterData.name,
                      type,
                      description,
                    });
                  } else if (typeDTO) {
                    let dtype = djson[parameterData.itemType];
                    type = TYPES.OBJECT;
                    description = parameterData.description;
                    (parameterList as any).parameterList = [];
                    let pparameterList = [];
                    if (dtype && dtype.length > 0 ) {
                      for (const actionPChile of dtype) {
                        pparameterList = await processParam((parameterList as any).parameterList, actionPChile, scope);
                      }
                      if (!(dtype[0].id)) {
                        dtype.unshift({id: -1, type: TYPES.OBJECT});
                      }
                    }
                    parameterList.push({
                      scope: scope,
                      name: parameterData.name,
                      type,
                      description,
                      parameterList: pparameterList,
                    });
                  } else {
                    if (!eJson) return false;
                    description = await MigrateService.onReadDes(eJson, parameterData.enumClass);
                    type = parameterData.type;
                    parameterList.push({
                      scope: scope,
                      name: parameterData.name,
                      type,
                      description,
                    });
                  }
                }
                return parameterList as any;
              }
              if (djson[action.itemType] && djson[action.itemType].length > 0) {
                action.parameterList = [];
                for (const actionChile of djson[action.itemType]) {
                  processParam(action.parameterList, actionChile, action.scope)
                }
                if (!(djson[action.itemType][0].id)) {
                  djson[action.itemType].unshift({
                    id: -1, type: action.type
                  })
                }
              }
            }
          }
        }
      }
    }
    return {json: json, djson: djson};
  }

  public static async onReadDto(dJson: any, eJson: any): Promise<any> {
    const val = await this.onReadChild(dJson, eJson);
    let json = {
      name: 'root',
      depth: -1,
      id: -1,
      children: [...val]
    }
    return json;
  }

  public static async onReadChild(values: any, eJson: any): Promise<any> {
    let jsonArray: any = [];
    let id = 0;
    for (const key in values) {
      id = id + 1;
      let type;
      if (values[key][0].id) {
        type = values[key][0].type
      } else {
        type = 'Object'
      }
      const children = await this.onReadChildParame(values, values[key], eJson);
      jsonArray.push({
        id,
        name: key,
        type,
        children,
      })
    }
    return jsonArray;
  }

  public static async getType(type: any, itemType: any): Promise<any> {
    let valueExp: any = '';
    let typeV: any;
    if (type === 'Integer' || type === 'Long' || type === 'Double') {
      typeV = 'Number'
    } else if (type === 'List') {
      typeV = 'Array'
      if (itemType === 'Integer' || itemType === 'Long' || itemType === 'Double') {
        valueExp = [1]
      }
    } else {
      typeV = type
    }
    return {type: typeV, valueExp: valueExp}
  }

  public static async onReadChildParame(values: any, value: any, eJson: any): Promise<any> {
    let arrays = [];
    let children: any = [];
    let description: String;
    if (value) {
      for (const array of value) {
        let nType = await this.getType(array.type, array.itemType);
        if (array.id !== -1) {
          let typeDTO = MigrateService.DTOreg.test(array.itemType);
          let typeDefault = MigrateService.Defaultreg.test(array.itemType);
          if (typeDTO) {
            children = await this.onReadChildParame(values, values[array.itemType], eJson);
            arrays.push({
              name: array.name,
              type: nType.type || 'Object',
              value: nType.valueExp,
              description: array.description,
              children,
            })
          } else if (typeDefault) {
            arrays.push({
              name: array.name,
              type: nType.type,
              value: nType.valueExp,
              description: array.description,
            })
          } else {
            if (!eJson) return false;
            description = await MigrateService.onReadDes(eJson, array.enumClass);
            arrays.push({
              name: array.name,
              type: nType.type,
              value: nType.valueExp,
              description: `${array.description} ${description}`,
            })
          }
        }
      }
    }
    return arrays;
  }

  public static async onSaveJson(curUserId: number, tsjson: string, dtoJson?: string, enumJson?: string, cJson?: string): Promise<any>  {
    let tJson: any = await Json.create({
      json: tsjson,
      creatorId: curUserId,
    });
    let dJson: any;
    let eJson: any;
    let ndJson: any;
    if  (dtoJson) {
      dJson = await Dto.create({
        json: dtoJson,
        creatorId: curUserId,
        repositoryId: undefined,
      });
      ndJson = dJson.dataValues.json;
    }
    if (enumJson) {
      eJson = await Enum.create({
        json: enumJson,
        creatorId: curUserId,
      });
      eJson = eJson.dataValues.json;
    }
    let json = tJson.dataValues.json;
    json = await this.onReadType(json, cJson);
    let newTsJson = await this.onReadJson(json, ndJson, eJson);
    await Json.update({
      json: newTsJson.json,
      creatorId: curUserId,
    }, { where: { id: tJson.dataValues.id } });
    ndJson = await this.onReadDto(newTsJson.djson, eJson)
    await Dto.update({
      json: ndJson,
      creatorId: curUserId,
      repositoryId: undefined,
    }, { where: { id: dJson.dataValues.id } });
    ndJson = await Dto.findOne({
      where: { id: dJson.dataValues.id },
    })
    tJson = await Json.findOne({
      where: { id: tJson.dataValues.id },
    })
    tJson = tJson.dataValues.json;
    return {tJson: tJson, dJson: ndJson};
  }

  /** 存储JSON */
  public static async importFromJson(orgId: number, curUserId: number, tsjson: string, dtoJson?: string, enumJson?: string, cJson?: string): Promise<boolean> {
    let obj = await this.onSaveJson(curUserId, tsjson, dtoJson, enumJson, cJson);
    return await this.importRepoFromProjectData(orgId, curUserId, obj.tJson, obj.dJson)
  }

  /** 导出DTOJSON */
  public static async exportRepoDtoJson(repositoryId: number): Promise<any> {
    let dJson = await Dto.findOne({
      where: { repositoryId },
    })
    return dJson ? dJson : undefined;
  }

  /** 导出JSON */
  public static async exportRepoFromJson(orgId: number, curUserId: number): Promise<boolean> {
    console.log(orgId, curUserId);
    return await true;
  }

  /** RAP1 property */
  public static async importRepoFromRAP1DocUrl(orgId: number, curUserId: number, docUrl: string): Promise<boolean> {
    const { projectId } = querystring.parse(docUrl.substring(docUrl.indexOf('?') + 1))
    let domain = docUrl
    if (domain.indexOf('http') === -1) {
      domain = 'http://' + domain
    }
    domain = domain.substring(0, domain.indexOf('/', domain.indexOf('.')))
    let result = await rp(`${domain}/api/queryRAPModel.do?projectId=${projectId}`, {
      json: false,
    })
    result = JSON.parse(result)
    // result =  unescape(result.modelJSON)
    result = result.modelJSON
    const safeEval = require('notevil')
    result = safeEval('(' + result + ')')
    return await this.importRepoFromRAP1ProjectData(orgId, curUserId, result)
  }
}

function getMethodFromRAP1RequestType(type: number) {
  switch (type) {
    case 1:
      return 'GET'
    case 2:
      return 'POST'
    case 3:
      return 'PUT'
    case 4:
      return 'DELETE'
    default:
      return 'GET'
  }
}

// function getTypeFromRAP1DataType(dataType: string) {
//   switch (dataType) {
//     case 'number':
//       return TYPES.NUMBER
//     case 'string':
//       return TYPES.STRING
//     case 'boolean':
//       return TYPES.BOOLEAN
//     case 'object':
//       return TYPES.OBJECT
//     default:
//       if (dataType && dataType.indexOf('array') > -1) {
//         return TYPES.ARRAY
//       } else {
//         return TYPES.STRING
//       }
//   }
// }

interface OldParameter {
  id: number
  name: string
  mockData: string
  identifier: string
  remark: string
  dataType: string
  parameterList: OldParameter[]
}

// interface NewParameter {
//   id: number
//   name: string
//   description: string
//   type: string
//   required: boolean
//   pos: number,
//   parameterList: NewParameter[]
// }
