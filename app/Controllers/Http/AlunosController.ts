import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async index() {
    const alunos = await Aluno.all()

    return {
      alunos,
    }
  }

  public async store({ request }: HttpContextContract) {
    try {
      const body = request.body()

      const aluno = await Aluno.create(body)

      return {
        msg: 'Aluno criado com sucesso!',
        aluno,
      }
    } catch (err) {
      return {
        err: 'Falha ao cadastrar o aluno!',
      }
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)

      return aluno
    } catch (error) {
      return {
        error: 'Não foi possivel encontrar o aluno por esse ID!',
      }
    }
  }

  public async update({ params, request }: HttpContextContract) {
    try {
      const body = request.body()
      const aluno = await Aluno.findOrFail(params.id)
      aluno.nome = body.nome
      aluno.matricula = body.matricula
      aluno.email = body.email
      aluno.dt_nascimento = body.dt_nascimento
      await aluno.save()

      return {
        msg: 'Dados do aluno atualizados com sucesso!',
        aluno,
      }
    } catch (error) {
      return {
        error: 'Falha ao atualizar os dados do aluno!',
      }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)
      await aluno.delete()
      return {
        message: 'Aluno excluído com sucesso',
        aluno,
      }
    } catch (error) {
      return {
        Error: 'Falha ao excluir o aluno',
      }
    }
  }
}
