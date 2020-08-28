const listTask = require('../services/tasks/list')
const createTask = require('../services/tasks/create')

const list = async ctx => {
  const {tasks, pageCount} = await listTask(ctx.query)

  ctx.body = {
    ok: true,
    data: {
      tasks,
      pagination: {
        pageCount,
        pageSize: ctx.query.pageSize,
        page: ctx.query.page
      }
    }
  }
}

const create = async ctx => {
  const task = await createTask(ctx.request.body)

  ctx.body = {
    ok: true,
    data: {
      task
    }
  }
}


module.exports = {list, create}
