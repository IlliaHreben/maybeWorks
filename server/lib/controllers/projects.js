const createProject = require('../services/projects/create')
const listProject = require('../services/projects/list')

 const create = async ctx => {
  const project = await createProject(ctx.request.body)

  ctx.body = {
    ok: true,
    data: {
      project
    }
  }
}

const list = async ctx => {
  const {projects, pageCount} = await listProject(ctx.query)

  ctx.body = {
    ok: true,
    data: {
      projects,
      pagination: {
        pageCount,
        pageSize: ctx.query.pageSize,
        page: ctx.query.page
      }
    }
  }
}

module.exports = {create, list}
