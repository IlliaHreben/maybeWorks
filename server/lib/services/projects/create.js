const { Projects, sequelize } = require('../../model')
const formatProject = require('./format')

const execute = async ({authorId, name, body, status, userIds}) => {

  // const user = await Users.findByPk(id)

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
}


module.exports = execute
