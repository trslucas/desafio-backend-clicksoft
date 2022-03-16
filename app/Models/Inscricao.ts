import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno';
import Sala from './Sala';

export default class Inscricao extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Aluno)
  public aluno: BelongsTo<typeof Aluno>

  @column()
  public id_aluno: string;

  @belongsTo(() => Sala)
  public sala: BelongsTo<typeof Sala>

  @column()
  public id_sala: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
