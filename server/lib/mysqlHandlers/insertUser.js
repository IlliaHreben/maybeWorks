const { Users } = require('../mysqlSchemas')

const insertUser = async ({email, name, surname}) => {

  const user = await Users.create({
    email,
    name,
    surname
  })

  return user
}

module.exports = insertUser
