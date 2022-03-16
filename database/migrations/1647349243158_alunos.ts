import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable().unique()
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('matricula').notNullable().unique()
      table.dateTime('dt_nascimento').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
