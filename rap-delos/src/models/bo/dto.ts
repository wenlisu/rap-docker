import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from '../'

@Table({ paranoid: true, freezeTableName: false, timestamps: true })
export default class Dto extends Model<Dto> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @Column(DataType.JSON)
  json: string

  @ForeignKey(() => User)
  @Column
  creatorId: number

  @BelongsTo(() => User, 'creatorId')
  creator: User
}