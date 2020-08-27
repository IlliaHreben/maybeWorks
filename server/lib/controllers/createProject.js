const insertProject = require('../mysqlHandlers/insertProject')

 const createProject = async ctx => {

  try {
    const project = await insertProject(JSON.stringify(ctx.request.body))

    ctx.status = 200
    ctx.message = 'User was created'
    ctx.body = {
      ok: true,
      data: {
        user: formatProject(project)
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

const formatProjects = project => {
  const {
    name,
    body,
    status,
    users: {
      name: authorName,
      surname: authorSurname
    },
    tasks
  } = project

  return {
    name,
    body,
    status,
    authorName,
    authorSurname,
    tasks
  }
}

module.exports = createProject
