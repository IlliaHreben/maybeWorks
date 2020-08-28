const { Op } = require('sequelize')

const {Projects, Users, Tasks} = require('../../model')
const formatProject = require('./format')

const findProject = async filters => {
  const { page, pageSize } = filters

  const offset = page * pageSize - pageSize
  const limit = page * pageSize

  const projectsWhere = {}
  if (filters.search) {
    projectsWhere[Op.and] = {
      [Op.or]: {
        name: { [Op.startsWith]: filters.search },
        body: { [Op.startsWith]: filters.search }
      }
    }
  }
  if (filters.statuses) {
    projectsWhere[Op.and]
    ? projectsWhere[Op.and].status = filters.statuses.split(',')
    : projectsWhere[Op.and] = { status: filters.statuses.split(',') }
  }

  const tasksWhere = {}
  if (filters.mark) {
    tasksWhere.mark = { [Op.between]: filters.mark.split(',') }
  }

  const authorWhere = {}
  if (filters.author) {
    authorWhere[Op.or] = {
      name: { [Op.startsWith]: filters.author },
      surname: { [Op.startsWith]: filters.author }
    }
  }

  const usersWhere = {}
  if (filters.participants) {
    usersWhere[Op.and] = {
      [Op.or]: {
        name: { [Op.startsWith]: filters.participant },
        surname: { [Op.startsWith]: filters.participant }
      }
    }
  }
  if (filters.participantId) {
    usersWhere[Op.and]
    ? usersWhere[Op.and].id = filters.participantId
    : usersWhere[Op.and] = { id: filters.participantId }
  }
  console.log(usersWhere, filters)

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

module.exports = findProject
