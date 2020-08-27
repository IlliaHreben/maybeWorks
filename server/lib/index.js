const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const bodyParser = require('body-parser')

const api = new Router({ prefix: '/api' })
api.get('/', hello)

function hello (ctx, next) {
  ctx.body = "Hello world!"
  next()
}

app.use(api.routes())
app.listen(3000)
