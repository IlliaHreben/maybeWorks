const findUsers = require('../mysqlHandlers/findUsers')

 const getUsers = async ctx => {

  const {page = 1, pageSize = 10, search = ''} = ctx.query

  try {
    const {users, pageCount} = await findUsers({page, pageSize}, search)

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

const formatUsers = user => {
  const {name, surname, email} = user

  return {
    name,
    surname,
    email
  }
}

module.exports = getUsers
