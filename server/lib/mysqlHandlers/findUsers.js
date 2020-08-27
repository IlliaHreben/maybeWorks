const { Op } = require('sequelize')

const { Users } = require('../mysqlSchemas')

 const findUsers = async ({page, pageSize}, search) => {
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

  return {users: rows, pageCount}
}

module.exports = findUsers
