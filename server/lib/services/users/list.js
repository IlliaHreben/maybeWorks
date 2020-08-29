const { Op } = require('sequelize')

const { Users } = require('../../model')
const formatUser = require('./format')

const validatorRules = {
  page: 'page_number',
  pageSize: 'page_size',
  search: [ 'string', { max_length: 20 } ]
}

const execute = async ({page, pageSize, search}) => {
  const offset = page * pageSize - pageSize
  const limit = page * pageSize

  const {count, rows} = await Users.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.startsWith]: search
          }
        }, {
          surname: {
          [Op.startsWith]: search
          }
        }
      ]
    },
    offset,
    limit
  })

  const pageCount = Math.ceil(count / pageSize)

  return {users: rows.map(formatUser), pageCount}
}

module.exports = {execute, validatorRules}
