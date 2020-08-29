const runService = require('../services/runService')
const createTask = runService(require('../services/tasks/create'))
const listTask = runService(require('../services/tasks/list'))

const list = async ctx => {
  const {statuses} = ctx.query

  const {tasks, pageCount} = await listTask({
    ...ctx.query,
    statuses: statuses ? statuses.split(',') : []
  })

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
