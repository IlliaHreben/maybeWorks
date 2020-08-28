const { Tasks } = require('../../model')
const formatTask = require('./format')

const insertTask = async ({name, description, mark, status, authorId, projectId, assigneeId}) => {

  // const user = await Users.findByPk(id)

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
}


module.exports = insertTask
