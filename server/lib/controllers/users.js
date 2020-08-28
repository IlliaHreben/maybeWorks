const createUser = require('../services/users/create')
const listUsers = require('../services/users/list')

 const create = async ctx => {

  const user = await createUser(ctx.request.body)

  ctx.body = {
    ok: true,
    data: {
      user
    }
  }
}

const list = async ctx => {
  const {page = 1, pageSize = 10, search = ''} = ctx.query

  const {users, pageCount} = await listUsers({page, pageSize}, search)

  ctx.body = {
    ok: true,
    data: {
      users,
      pagination: {
        pageCount,
        pageSize,
        page
      }
    }
  }
}

module.exports = {create, list}
