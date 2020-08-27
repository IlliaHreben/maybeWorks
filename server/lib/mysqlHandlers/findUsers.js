const Users = require('../mysqlSchemas')

async const findUsers = (page, {name, surname}) => {
  const offset = page * 12 - 12
  const limit = page * 12

  const usersList = await Users.findAll({
    where: {
      [or]: [
        {name},
        {surname},
      ]
    },
    offset,
    limit
  })

  return usersList
}

module.exports = findUsers
