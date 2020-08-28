const insertProject = require('../mysqlHandlers/insertProject')

 const createProject = async ctx => {

  try {
    const project = await insertProject(ctx.request.body)

    ctx.status = 200
    ctx.message = 'Project was created'
    ctx.body = {
      ok: true,
      data: {
        project: formatProjects(project)
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
    id,
    name,
    body,
    status,
    authorId
  } = project

  return {
    id,
    name,
    body,
    status,
    authorId
  }
}

module.exports = createProject
