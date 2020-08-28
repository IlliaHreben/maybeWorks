const insertUser = require('../mysqlHandlers/insertUser')

 const createUser = async ctx => {

  try {
    const user = await insertUser(ctx.request.body)

    ctx.status = 200
    ctx.message = 'User was created'
    ctx.body = {
      ok: true,
      data: {
        user: formatUsers(user)
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

module.exports = createUser
