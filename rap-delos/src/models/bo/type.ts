import { Table, Column, Model, HasMany, Default, AutoIncrement, PrimaryKey, AllowNull, DataType, BelongsTo, ForeignKey, BeforeBulkDelete, BeforeBulkCreate, BeforeBulkUpdate, BeforeCreate, BeforeUpdate, BeforeDelete } from 'sequelize-typescript'
import { User, Module, Repository, Interface } from '../';
import RedisService, { CACHE_KEY } from '../../service/redis'
import * as Sequelize from 'sequelize'

const Op = Sequelize.Op

enum methods { GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE' }

@Table({ paranoid: true, freezeTableName: false, timestamps: true })
export default class Type extends Model<Type> {

  /** hooks */
  @BeforeCreate
  @BeforeUpdate
  @BeforeDelete
  static async deleteCache(instance: Type) {
    await RedisService.delCache(CACHE_KEY.REPOSITORY_GET, instance.repositoryId)
  }

  @BeforeBulkCreate
  @BeforeBulkUpdate
  @BeforeBulkDelete
  static async bulkDeleteCache(options: any) {
    let id: number = +(options && options.attributes && options.attributes.id)
    if (!id) {
      id = options.where && +options.where.id
    }
    if (options.where && options.where[Op.and]) {
      const arr = options.where[Op.and]
      if (arr && arr[1] && arr[1].id) {
        id = arr[1].id
      }
    }
    if (+id) {
      id = +id
      const itf = await Type.findById(id)
      await RedisService.delCache(CACHE_KEY.REPOSITORY_GET, itf.repositoryId)
    }
  }

  public static METHODS = methods

  public request?: object
  public response?: object

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @Column(DataType.STRING(256))
  name: string

  @AllowNull(false)
  @Default(1)
  @Column(DataType.BIGINT(11))
  priority: number

  @ForeignKey(() => User)
  @Column
  creatorId: number

  @ForeignKey(() => User)
  @Column
  lockerId: number

  @ForeignKey(() => Module)
  @Column
  moduleId: number

  @ForeignKey(() => Repository)
  @Column
  repositoryId: number

  @BelongsTo(() => User, 'creatorId')
  creator: User

  @BelongsTo(() => User, 'lockerId')
  locker: User

  @BelongsTo(() => Module, 'moduleId')
  module: Module

  @BelongsTo(() => Repository, 'repositoryId')
  repository: Repository

  @HasMany(() => Interface, 'typeId')
  interfaces: Interface[]

}

