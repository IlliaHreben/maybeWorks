const { Op } = require('sequelize')

const {Projects, Users, Tasks} = require('../../model')
const formatProject = require('./format')

const validatorRules = {
  page: 'page_number',
  pageSize: 'page_size',
  projectSearch: ['not_empty', 'string', { max_length: 100 } ],
  statuses: 'task_statuses',
  minMark: [ 'not_empty', 'task_mark', {default: 0} ],
  maxMark: [ 'not_empty', 'task_mark', {default: 5} ],
  author: [ 'not_empty', 'string', { min_length: 2 } ],
  participantSearch: [ 'not_empty', 'string', { min_length: 2 } ],
  participantId: 'positive_integer'
}

const execute = async filters => {
  const { page, pageSize } = filters

  const offset = page * pageSize - pageSize
  const limit = page * pageSize
  console.log('---------------------------------')
  console.log(filters)

  const projectsWhere = {}
  if (filters.projectSearch) {
    console.log('---------------------------------projectsWhere')
    projectsWhere[Op.and] = {
      [Op.or]: {
        name: { [Op.startsWith]: filters.projectSearch },
        body: { [Op.startsWith]: filters.projectSearch }
      }
    }
  }
  if (filters.statuses) {
    console.log('---------------------------------statuses')
    projectsWhere[Op.and]
    ? projectsWhere[Op.and].status = filters.statuses
    : projectsWhere[Op.and] = { status: filters.statuses }
  }

  const tasksWhere = {
    mark: {
      [Op.between]: [filters.minMark, filters.maxMark]
    }
  }

  const authorWhere = {}
  if (filters.author) {
    console.log('---------------------------------author')
    authorWhere[Op.or] = {
      name: { [Op.startsWith]: filters.author },
      surname: { [Op.startsWith]: filters.author }
    }
  }

  const usersWhere = {}
  if (filters.participantSearch) {
    console.log('---------------------------------participantSearch')
    usersWhere[Op.and] = {
      [Op.or]: {
        name: { [Op.startsWith]: filters.participantSearch },
        surname: { [Op.startsWith]: filters.participantSearch }
      }
    }
  }
  if (filters.participantId) {
    console.log('---------------------------------participantId')
    usersWhere[Op.and]
    ? usersWhere[Op.and].id = filters.participantId
    : usersWhere[Op.and] = { id: filters.participantId }
  }
  console.log(projectsWhere,tasksWhere, authorWhere , usersWhere)

  const {rows, count} = await Projects.findAndCountAll({
    where: projectsWhere,
    offset,
    limit,
    include: [
      {
        model: Tasks,
        where: tasksWhere,
        required: false
      }, {
        model: Users,
        as: 'Author',
        where: authorWhere
      }, {
        model: Users,
        where: usersWhere,
        required: false
      }
    ]
  })

  const pageCount = Math.ceil(count / pageSize)

  return {projects: rows.map(formatProject), pageCount}
}

module.exports = {execute, validatorRules}
