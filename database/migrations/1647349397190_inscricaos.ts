import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Inscricao extends BaseSchema {
  protected tableName = 'inscricaos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unique().primary()

      table
        .string('id_aluno')
        .references('id')
        .inTable('alunos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('id_sala')
        .references('id')
        .inTable('salas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
