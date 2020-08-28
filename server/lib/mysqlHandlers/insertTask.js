const { Tasks } = require('../mysqlSchemas')


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


  return task
}


module.exports = insertTask
