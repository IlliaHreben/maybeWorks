const runService = require('../services/runService')
const createProject = runService(require('../services/projects/create'))
const listProject = runService(require('../services/projects/list'))

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
  const {page, pageSize, projectSearch, statuses, minMark, maxMark, author, participantSearch, participantId} = ctx.query

  const {projects, pageCount} = await listProject({
    page,
    pageSize,
    projectSearch,
    statuses: statuses ? statuses.split(',') : undefined,
    minMark,
    maxMark,
    author,
    participantSearch,
    participantId
  })

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
