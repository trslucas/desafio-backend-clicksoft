import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'

export default class ProfessorsController {
  public async index() {
    const professores = await Professor.all()
    return {
      professores,
    }
  }

  public async store({ request }: HttpContextContract) {
    try {
      const body = request.body()
      const professor = await Professor.create(body)
      return {
        msg: 'Professor cadastrado com sucesso!',
        professor,
      }
    } catch (err) {
      return {
        err: 'Falha ao cadastrar o professor!',
      }
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const professor = await Professor.findOrFail(params.id)
      return {
        message: 'Professor encontrado!',
        professor,
      }
    } catch (error) {
      return {
        error: 'Não foi possivel encontrar o professor por esse ID!',
      }
    }
  }

  public async update({ params, request }: HttpContextContract) {
    try {
      const body = request.body()
      const professor = await Professor.findOrFail(params.id)
      professor.nome = body.nome
      professor.matricula = body.matricula
      professor.email = body.email
      professor.dt_nascimento = body.dt_nascimento
      await professor.save()
      return {
        msg: 'Dados atualizados com sucesso!',
        professor,
      }
    } catch (error) {
      return {
        error: 'Falha ao atualizar os dados!',
      }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const professor = await Professor.findOrFail(params.id)
      await professor.delete()
      return {
        message: 'Professor excluído com sucesso',
        professor,
      }
    } catch (error) {
      return {
        Error: 'Falha ao excluir o professor',
      }
    }
  }
}
