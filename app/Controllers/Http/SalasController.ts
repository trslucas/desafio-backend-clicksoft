import { HttpContext } from '@adonisjs/core/build/standalone'
import Sala from 'App/Models/Sala'
import Database from '@ioc:Adonis/Lucid/Database'
import Professor from 'App/Models/Professor'

export default class SalasController {
  public async store({ request }: HttpContext) {
    const { id } = request.params()
    const { numero, capacidade, disponibilidade } = request.body()
    const professor = await Professor.findOrFail(id)

    const sala = new Sala()
    sala.numero = numero
    sala.capacidade = capacidade
    sala.disponibilidade = disponibilidade
    sala.owner_id = professor.id

    await sala.save()

    return sala
  }

  public async index() {
    const salas = await Sala.all()
    return {
      salas,
    }
  }

  public async update({ request }: HttpContext) {
    const { numero, capacidade, disponibilidade, id_professor } = request.body()
    const { id } = request.params()
    const sala = await Sala.findByOrFail('id', id)
    const professor = await Professor.findByOrFail('id', id_professor)

    if (sala.owner_id != professor.id) {
      throw new Error('Professor sem permissão de acesso')
    }

    sala.numero = numero
    sala.capacidade = capacidade
    sala.disponibilidade = disponibilidade
    await sala.save()

    return {
      message: 'Sala atualizada com sucesso!',
      sala,
    }
  }

  public async destroy({ request }: HttpContext) {
    try {
      const { id } = request.params()
      const sala = await Sala.findByOrFail('id', id)

      sala.delete()

      return {
        msg: 'Sala deletada com sucesso!',
        sala,
      }
    } catch (error) {
      return {
        error: 'Falha ao deletar a sala!',
      }
    }
  }

  public async show({ request }) {
    try {
      const { id } = request.params()

      const sala = await Sala.findByOrFail('id', id)

      return {
        message: 'Sala encontrada!',
        sala,
      }
    } catch (error) {
      return {
        error: 'Falha ao encontrar a sala pelo ID',
      }
    }
  }

  public async acharPeloProfessor({ request }: HttpContext) {
    const { id } = request.params()
    const salas = await Database.from('salas').select('salas.*').where('salas.owner_id', id)
    if (!salas) {
      throw Error('Não existem salas')
    }

    return salas
  }
}
