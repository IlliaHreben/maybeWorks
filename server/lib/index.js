const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const getUsers = require('./controllers/getUsers')
// const getTasks = require('./controllers/getTasks')
const getProjects = require('./controllers/getProjects')
const createUser = require('./controllers/createUser')
// const createTask = require('./controllers/createTask')
const createProject = require('./controllers/createProject')


const api = new Router({ prefix: '/api' })
  .use(bodyParser())
  .get('/users', getUsers)
  .get('/projects', getProjects)
  // .get('/tasks', getTasks)
  .post('/users', createUser)
  .post('/projects', createProject)
  // .post('/tasks', createTask)


app.use(api.routes())
app.listen(3000)
