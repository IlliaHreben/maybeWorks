const insertTask = require('../mysqlHandlers/insertTask')

 const createTask = async ctx => {

  try {
    const task = await insertTask(ctx.request.body)

    ctx.status = 200
    ctx.message = 'Task was created'
    ctx.body = {
      ok: true,
      data: {
        task: formatTasks(task)
      }
    }
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = {
      ok: false,
      error: 'Internal server error'
    }
  }
}

const formatTasks = task => {
  const {
    id,
    name,
    description,
    mark,
    status,
    authorId,
    projectId,
    assigneeId
  } = task

  return {
    id,
    name,
    description,
    mark,
    status,
    authorId,
    projectId,
    assigneeId
  }
}

module.exports = createTask
