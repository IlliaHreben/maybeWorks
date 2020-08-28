const { Tasks } = require('../../model')
const formatTask = require('./format')

const ApiError = require('../apiError')
const { ForeignKeyConstraintError } = require('sequelize')

const insertTask = async ({name, description, mark, status, authorId, projectId, assigneeId}) => {
  try {
    const task = await Tasks.create({
      name,
      description,
      mark,
      status,
      authorId,
      projectId,
      assigneeId
    })


    return formatTask(task)

  } catch (err) {
    if (err instanceof ForeignKeyConstraintError) {
      throw new ApiError({code: 'AUTHOR||PROJECT||ASSIGNEE_NOT_FOUND', message: 'Author, project or assignee not found'})
    }
    throw err
  }
}


module.exports = insertTask
