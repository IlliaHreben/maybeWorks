const { Op } = require('sequelize')

const {Tasks, Users} = require('../../model')
const formatTask = require('./format')

const validatorRules = {
  page: 'page_number',
  pageSize: 'page_size',
  search: [ 'not_empty', 'string', { max_length: 50 } ],
  statuses: [ 'not_empty', 'task_statuses' ],
  minMark: [ 'not_empty', 'task_mark', {default: 0} ],
  maxMark: [ 'not_empty', 'task_mark', {default: 5} ],
  author: [ 'not_empty', 'string', { max_length: 50 } ],
  assignee: [ 'not_empty', 'string', { max_length: 50 } ],
  assigneeId: [ 'not_empty', 'positive_integer']
}

const execute = async filters => {
  const { page, pageSize } = filters

  const offset = page * pageSize - pageSize
  const limit = page * pageSize

  const tasksWhere = {
    [Op.and]: { mark: {[Op.between]: [filters.minMark, filters.maxMark]} }
  }
  if (filters.search) {
    tasksWhere[Op.and][Op.or] = {
        name: { [Op.startsWith]: filters.search },
        description: { [Op.startsWith]: filters.search }
    }
  }
  if (filters.statuses) {
    tasksWhere[Op.and].status = { [Op.or]: filters.statuses }
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

module.exports = {execute, validatorRules}
