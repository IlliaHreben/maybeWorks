const { Users } = require('../../model')

const ApiError = require('../apiError')
const { UniqueConstraintError } = require('sequelize')

const validatorRules = {
  email: ['required', 'trim', 'email', 'to_lc'],
  name: [ 'required', 'string', { min_length: 2 } ],
  surname: [ 'required', 'string', { min_length: 2 } ]
}

const execute = async ({email, name, surname}) => {

  try {
    const user = await Users.create({
      email,
      name,
      surname
    })

    return {id: user.id}
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new ApiError({code: 'EMAIL_NOT_UNIQUE', message: 'User already exist'})
    }
    throw err
  }

}

module.exports = {execute, validatorRules}
