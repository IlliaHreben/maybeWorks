const { Op } = require('sequelize')

const {Projects, Users} = require('../../model')
const formatProject = require('./format')

const findProject = async filters => {
  const {
    page = 1,
    pageSize = 10,
    search = '', // name or body
    statuses = '',
    author = '', // name or surname
    participant = '', //name or surname
    participantId = null,
    mark = null
  } = filters
  const offset = page * pageSize - pageSize
  const limit = page * pageSize
  const formatedStatuses = statuses.split(',')
  const participantIds = participantId.split(',')
  console.log(author)

  const {rows, count} = await Projects.findAndCountAll({
    where: {
      [Op.and]: {

        [Op.or]:
          {
            name: {
              [Op.startsWith]: search // like has low performance
            },

            body: {
              [Op.startsWith]: search
            }
          }
        ,
        status: { [Op.in]: formatedStatuses }
      }
    },
    offset,
    limit,
    include: [
      // {
      //   model: Tasks,
      //   where: {
      //     mark: {
      //       [Op.gt]: taskAssessment
      //     }
      //   }
      // },
      {
        model: Users,
        as: 'Author',
        where: {
          [Op.or]:
            {
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
              id: {
                [Op.in]: participantIds
              }
            }
          ]
        }
      }
    ]
  })

  const pageCount = Math.ceil(count / pageSize)

  return {projects: rows.map(formatProject), pageCount}
}

module.exports = findProject
