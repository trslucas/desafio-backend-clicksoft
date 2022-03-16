import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Inscricao from './Inscricao'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public matricula: string

  @column()
  public dt_nascimento: Date

  @hasMany(() => Sala)
  public salas: HasMany<typeof Sala>

  @hasMany(() => Inscricao)
  public inscricoes: HasMany<typeof Inscricao>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
