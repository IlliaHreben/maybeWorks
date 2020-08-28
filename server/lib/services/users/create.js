const { Users } = require('../../model')

const formatUser = require('./format')

const insertUser = async ({email, name, surname}) => {

  const user = await Users.create({
    email,
    name,
    surname
  })

  return formatUser(user)
}

module.exports = insertUser
