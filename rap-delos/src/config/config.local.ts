import { IConfigOptions } from "../types";

let config: IConfigOptions = {
  version: '2.3',
  serve: {
    port: 8090,
  },
  keys: ['some secret hurr'],
  session: {
    key: 'rap2:sess',
  },
  db: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'web123456',
    database: 'RAP2_DELOS_APP',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  mail: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: ''
    }
  },
  mailSender: '',
}

export default config