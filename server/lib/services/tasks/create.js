const { Tasks } = require('../../model')

const ApiError = require('../apiError')
const { ForeignKeyConstraintError } = require('sequelize')

const validatorRules = {
  name: [ 'required', 'string', { length_between: [2, 30] } ],
  description: [ 'required', 'string', { max_length: 90 } ],
  mark: [ 'required', { 'number_between': [0, 5] } ],
  status: [ 'task_status' ],
  authorId: [ 'required', 'positive_integer'],
  projectId: [ 'required', 'positive_integer'],
  assigneeId: [ 'required', 'positive_integer']
}

const execute = async ({name, description, mark, status, authorId, projectId, assigneeId}) => {
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


    return {id: task.id}

  } catch (err) {
    if (err instanceof ForeignKeyConstraintError) {
      throw new ApiError({code: 'WRONG_ID', message: 'Author, project or assignee not found'})
    }
    throw err
  }
}


module.exports = {execute, validatorRules}
