const { Projects, Users } = require('../mysqlSchemas')

const insertUser = async (name, body, status, author) => {

  const user = await Users.findOne({where:
    {
      name: author.name,
      surname: author.surname
    }
  })
  const project = await Projects.create({
    name,
    body,
    status,
    authorId: user.id
  })

  return project
}

module.exports = insertUser
