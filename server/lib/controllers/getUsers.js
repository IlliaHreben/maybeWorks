const findUsers = require('../mysqlHandlers/findUsers')

async const getUsers = ctx => {
  const elementsOnPage = 12

  const {page, name, surname} = ctx.params

  let users
  try {
    users = await findUsers({page, elementsOnPage}, {name, surname})
  } catch {
    ctx.status = '400'
    ctx.body = {
      ok: false,
      error: 'Cannot find users'
    }
  }


  ctx.status = '200'
  ctx.body = {
    ok: true,
    data: {
      users: users.map(formatUsers),
      pagination: {
        elementsOnPage,
        page
      }
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
