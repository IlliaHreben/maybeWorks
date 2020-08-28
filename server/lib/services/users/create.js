const { Users } = require('../../model')

const formatUser = require('./format')
const ApiError = require('../apiError')
const { UniqueConstraintError } = require('sequelize')

const insertUser = async ({email, name, surname}) => {

  try {
    const user = await Users.create({
      email,
      name,
      surname
    })

    return formatUser(user)
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new ApiError({code: 'EMAIL_NOT_UNIQUE', message: 'User already exist'})
    }
    throw err
  }

}

module.exports = insertUser
