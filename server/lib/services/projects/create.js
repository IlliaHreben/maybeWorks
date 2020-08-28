const { Projects, sequelize } = require('../../model')
const formatProject = require('./format')

const ApiError = require('../apiError')
const { ForeignKeyConstraintError } = require('sequelize')

const execute = async ({authorId, name, body, status, userIds}) => {
  try {
    const result = await sequelize.transaction(async t => {

      const project = await Projects.create({
        name,
        body,
        status,
        authorId
      }, {transaction: t})

      await project.setUsers( userIds, {transaction: t} )

      return project
    })

    return formatProject(result)
  } catch (err) {
    if (err instanceof ForeignKeyConstraintError) {
      throw new ApiError({code: 'USER_OR_AUTHOR_NOT_FOUND', message: 'User or author not found'})
    }
    throw err
  }
}


module.exports = execute
