import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User, Repository } from '../'

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

  @ForeignKey(() => Repository)
  @Column
  repositoryId: number

  @BelongsTo(() => User, 'creatorId')
  creator: User

  @BelongsTo(() => Repository, 'repositoryId')
  repository: Repository
}