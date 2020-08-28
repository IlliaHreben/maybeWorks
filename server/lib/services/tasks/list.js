const { Op } = require('sequelize')

const {Tasks, Users} = require('../../model')
const formatTask = require('./format')

const findProject = async filters => {
  const {
    page = 1,
    pageSize = 10,
    search = '', // name or description
    statuses = '',
    author = '', // name or surname
    assignee = '', //name or surname
    assigneeIds = null,
    marks = null
  } = filters
  const offset = page * pageSize - pageSize
  const limit = page * pageSize
  const formatedStatuses = statuses.split(',')
  const formatedAssigneeIds = assigneeIds.split(',')
  const formatedMarks = marks.split(',')


  const {rows, count} = await Tasks.findAndCountAll({
    where: {
      [Op.and]: {

        [Op.or]:
          {
            name: {
              [Op.startsWith]: search // like has low performance
            },

            description: {
              [Op.startsWith]: search
            }
          }
        ,
        status: { [Op.in]: formatedStatuses },
        mark: { [Op.in]: formatedMarks }
      }
    },
    offset,
    limit,
    include: [
      {
        model: Users,
        where: {
          [Op.or]: {
            name: {
              [Op.startsWith]: author
            },

            surname: {
              [Op.startsWith]: author
            }
          }
        }
      }, {
        model: Users,
        where: {
          [Op.or]: {
            name: {
              [Op.startsWith]: assignee
            },

            surname: {
              [Op.startsWith]: assignee
            },

            id: {
              [Op.in]: formatedAssigneeIds
            }
          }
        }
      }
    ]
  })

  const pageCount = Math.ceil(count / pageSize)

  return {tasks: rows.map(formatTask), pageCount}
}

module.exports = findProject
