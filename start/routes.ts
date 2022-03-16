/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// HABILITAR CORS
Route.group(() => {
  Route.resource('/professores', 'ProfessorsController').apiOnly()
}).prefix('/api')

Route.group(() => {
  Route.resource('/alunos', 'AlunosController').apiOnly()
}).prefix('/api')

Route.group(() => {
  Route.resource('/salas', 'SalasController').apiOnly().except(["store"])
}).prefix('/api')
Route.post('salas/:id/', 'SalasController.store')

Route.get('/salas/professores/:id', 'SalasController.acharPeloProfessor').prefix('/api')
Route.post('/inscricoes/:id', 'InscricoesController.store').prefix('/api')
Route.get('/inscricoes', 'InscricoesController.index').prefix('/api')
Route.delete('/inscricoes/:id', 'InscricoesController.destroy').prefix('/api')
Route.get('/inscricoes/salas/:id/alunos', 'InscricoesController.listarAlunoPelaSala').prefix('/api')
Route.get('/inscricoes/salas/alunos/:id', 'InscricoesController.listarSalasPorAluno').prefix('/api')
