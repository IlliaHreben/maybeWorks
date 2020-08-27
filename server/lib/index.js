const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const getUsers = require('./controllers/getUsers')
const getTasks = require('./controllers/getTasks')
const getProjects = require('./controllers/getProjects')
const createUser = require('./controllers/createUser')
const createTask = require('./controllers/createTask')
const createProject = require('./controllers/createProject')


const api = new Router({ prefix: '/api' })
  .get('/users/:page/:name/:surname', getUsers)
  .get('/tasks', getTasks)
  .get('/projects', getProjects)
  .post('/users', createUser)
  .post('/tasks', createTask)
  .post('/projects', createProject)


app.use(api.routes())
app.listen(3000)
