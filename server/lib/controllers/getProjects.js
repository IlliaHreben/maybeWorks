const findProjects = require('../mysqlHandlers/findProjects')

const getProjects = async ctx => {

  try {
    const {users, pageCount} = await findProjects(ctx.query)

    ctx.status = 200
    ctx.body = {
      ok: true,
      data: {
        users: users.map(formatUsers),
        pagination: {
          pageCount,
          pageSize,
          page
        }
      }
    }
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = {
      ok: false,
      error: 'Internal server error'
    }
  }
}

const formatProjects = project => {
  const {
    name,
    body,
    status,
    users: {
      name: authorName,
      surname: authorSurname
    },
    tasks
  } = project

  return {
    name,
    surname,
    email
  }
}

module.exports = getUsers
