const { Op } = require('sequelize')

const {Projects, Tasks} = require('../mysqlSchemas')

const findProject = async filters => {
  const {
    page = 1,
    pageSize = 10,
    search = '', // name or body
    status = '',
    author = '', // name or surname
    participant = '', //name or surname
    participantId = null,
    taskAssessment = null
  } = filters
  const offset = page * pageSize - pageSize
  const limit = page * pageSize
  const statuses = status.split(',')
  const participantIds = participantId.split(',')


  const {rows, count} = await Projects.findAndCountAll({
    where: {
      [Op.and]: {

        [Op.or]: [
          {
            name: {
              [Op.startsWith]: search // like has low performance
            }
          }, {
            body: {
              [Op.startsWith]: search
            }
          }
        ],
        status: { [Op.in]: statuses }
      },
      offset,
      limit
    },
    include: [
      {
        model: Tasks,
        where: {
          taskAssessment: {
            [Op.gt]: taskAssessment
          }
        }
      }, {
        model: Users,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.startsWith]: author
              }
            }, {
              surname: {
                [Op.startsWith]: author
              }
            }
          ]
        }
      }, {
        model: 'usersProjects',
        where: {
          [Op.or]: [
            {
              name: {
                [Op.startsWith]: participant
              }
            }, {
              surname: {
                [Op.startsWith]: participant
              }
            }, {
              id: participantIds
            }
          ]
        }
      }
    ]
  })

  const pageCount = Math.ceil(count / pageSize)

  return {users: rows, pageCount}
}

module.exports = findUsers
