const findProjects = require('../mysqlHandlers/findProjects')

const getProjects = async ctx => {

  try {
    const {projects, pageCount} = await findProjects(ctx.query)

    ctx.status = 200
    ctx.body = {
      ok: true,
      data: {
        projects: projects.map(formatProjects),
        pagination: {
          pageCount,
          pageSize: ctx.query.pageSize,
          page: ctx.query.page
        }
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
    users: {
      name: authorName,
      surname: authorSurname
    },
    tasks
  } = project

  return {
    id,
    name,
    body,
    status,
    authorName,
    authorSurname,
    tasks
  }
}

module.exports = getProjects
