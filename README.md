# rap2-docker
docker部署淘宝rap2服务

## 后端部署

```cmd
> cd rap-delos
> docker-compose up -d
> docker exec -it rap2-delos sh
> node scripts/init
> exit
> docker-compose down
> docker-compose up -d
```

## 前端部署

修改`src/config/config.prod.js`中的后端服务器地址

```javascript
// http://xxx.xxx.xxx.xx:38080替换成自己服务器地址，或者域名
module.exports = {
  serve: 'http://xxx.xxx.xxx.xx:38080',
  keys: ['some secret hurr'],
  session: {
    key: 'koa:sess'
  }
}
```

启动服务

```cmd
> cd rap-dolores
重新打包
> docker build -t rap2-dolores .
> docker-compose up -d
```

更多请看文章[教你使用docker部署淘宝rap2服务](https://www.cnblogs.com/rynxiao/p/9080179.html)

### TODO

0.0.1
* ~~修改ts接口interface空格为2格~~
* ~~添加ts接口interface单行注释~~
* ~~添加导入后端接口json功能~~
  * ~~UI入口~~
  * ~~解析json~~
  * ~~SQL数据库添加JSON MODEL以来创建新表存储用户上传的JSON文件、解析JSON文件INSERT进对应数据表生成新的项目接口~~

0.0.2
* ~~增加多个文件（默认.json、dto.json、enum.json）解析~~
  * ~~将dto、enum解析生成到默认对应的子参数列表~~

* 增加在线接口测试（暂不考虑）
* ~~添加到vscode插件中~~
* ~~根据后端生成数据，调整结构~~
* ~~生成一整份DT文件的interfaces~~
* 完善需求：
  * ~~DTO的interfaces去重~~
  * ~~响应内容区增加折叠功能~~
  * ~~请求地址过滤~~
