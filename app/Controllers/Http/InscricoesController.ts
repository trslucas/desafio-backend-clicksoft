// import { v4 as uuidv4 } from "uuid";
import Inscricao from 'App/Models/Inscricao'
import Sala from 'App/Models/Sala'
import Professor from 'App/Models/Professor'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContext } from '@adonisjs/core/build/standalone'
import Aluno from 'App/Models/Aluno'

export default class InscricoesController {
  public async store({ request }) {
    const { id } = request.params()
    const { id_aluno, id_sala } = request.body()
    const professor = await Professor.findByOrFail('id', id)

    const sala = await Sala.findByOrFail('id', id_sala)
    const aluno = await Aluno.findByOrFail('id', id_aluno)

    if (professor.id != sala.owner_id) {
      throw new Error('Professor sem permissão de acesso!')
    }

    if (!aluno) {
      throw new Error('Aluno não encontrado!')
    }

    const inscricaoExistente = await Database.from('inscricaos')
      .select('*')
      .where('inscricaos.id_aluno', '=', id_aluno)
      .andWhere('inscricaos.id_sala', '=', id_sala)

    if (inscricaoExistente.length > 0) {
      throw new Error('Aluno já registrado nessa sala!')
    }

    const alunos = await Database.from('inscricaos')
      .join('alunos', (query) => {
        query.on('inscricaos.id_aluno', 'alunos.id')
      })
      .select('alunos.*')
      .where('inscricaos.id_sala', '=', sala.id)

    if (alunos.length < sala.capacidade) {
      const body = request.body()
      const inscricao = await Inscricao.create(body)

      return inscricao
    } else {
      throw new Error('Capacidade máxima de alunos excedida!')
    }
  }

  public async destroy({ request }) {
    const { id } = request.params()
    const { id_aluno, id_sala } = request.body()

    const professor = await Professor.findByOrFail('id', id)
    const sala = await Sala.findByOrFail('id', id_sala)

    if (sala.owner_id != professor.id) {
      throw new Error('Professor sem permissão de acesso!')
    }

    await Database.from('inscricaos')

      .delete()
      .where('inscricaos.id_sala', '=', id_sala)
      .andWhere('inscricaos.id_aluno', '=', id_aluno)
  }

  public async index() {
    const inscricao = await Inscricao.all()

    return {
      inscricao,
    }
  }

  public async listarSalasPorAluno({ request }: HttpContext) {
    const { id } = request.params()

    const salas = await Database.from('inscricaos')
      .join('salas', (query) => {
        query.on('salas.id', 'inscricaos.id_sala')
      })
      .select('salas.*')
      .where('inscricaos.id_aluno', '=', id)

    return salas
  }

  public async listarAlunoPelaSala({ request }: HttpContext) {
    const { id } = request.params()

    const alunos = await Database.from('inscricaos')
      .join('alunos', (query) => {
        query.on('inscricaos.id_aluno', 'alunos.id')
      })
      .select('alunos.*')
      .where('inscricaos.id_sala', '=', id)

    return alunos
  }
}
