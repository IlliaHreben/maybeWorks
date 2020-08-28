const { Op } = require('sequelize')

const {Tasks, Users} = require('../../model')
const formatTask = require('./format')

const findProject = async filters => {
  const { page, pageSize } = filters
  
  const offset = page * pageSize - pageSize
  const limit = page * pageSize

  const tasksWhere = {}
  if (filters.search) {
    tasksWhere[Op.and] = {
      [Op.or]: {
        name: { [Op.startsWith]: filters.search },
        description: { [Op.startsWith]: filters.search }
      }
    }
  }
  if (filters.statuses) {
    const formatedStatuses = { [Op.in]: filters.statuses.split(',') }

    tasksWhere[Op.and]
    ? tasksWhere[Op.and].status = formatedStatuses
    : tasksWhere[Op.and] = { status: formatedStatuses }
  }
  if (filters.marks) {
    const formatedMarks = { [Op.in]: filters.marks.split(',') }

    tasksWhere[Op.and]
    ? tasksWhere[Op.and].mark = formatedMarks
    : tasksWhere[Op.and] = { mark: formatedMarks }
  }

  const usersWhere = {}
  if (filters.author) {
    usersWhere[Op.or] = {
      name: { [Op.startsWith]: filters.author },
      surname: { [Op.startsWith]: filters.author }
    }
  }

  const assigneeWhere = {}
  if (filters.assignee) {
    usersWhere[Op.or] = {
      name: { [Op.startsWith]: filters.assignee },
      surname: { [Op.startsWith]: filters.assignee }
    }
  }
  if (filters.assigneeId) {
    usersWhere[Op.or]
    ? usersWhere[Op.or].id = filters.assigneeId
    : usersWhere[Op.or] = {id: filters.assigneeId}
  }


  const {rows, count} = await Tasks.findAndCountAll({
    where: tasksWhere,
    offset,
    limit,
    include: [
      {
        model: Users,
        where: usersWhere
      }, {
        model: Users,
        where: assigneeWhere
      }
    ]
  })

  const pageCount = Math.ceil(count / pageSize)

  return {tasks: rows.map(formatTask), pageCount}
}

module.exports = findProject
