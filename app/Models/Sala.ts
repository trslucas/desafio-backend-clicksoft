import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Inscricao from './Inscricao'
import Professor from './Professor'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public numero: number

  @column()
  public capacidade: number

  @column()
  public disponibilidade: boolean

  @hasMany(() => Inscricao)
  public inscricoes: HasMany<typeof Inscricao>

  @belongsTo(() => Professor)
  public owner: BelongsTo<typeof Professor>

  @column()
  public owner_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
