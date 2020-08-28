const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const controllers = require('./controllers/index')
const handleError = require('./controllers/middleware')


const api = new Router({ prefix: '/api' })
  .use(bodyParser())
  .use(handleError)
  .get('/users', controllers.users.list)
  .post('/users', controllers.users.create)
  .get('/projects', controllers.projects.list)
  .post('/projects', controllers.projects.create)
  .get('/tasks', controllers.tasks.list)
  .post('/tasks', controllers.tasks.create)


app.use(api.routes())
app.listen(3000)
