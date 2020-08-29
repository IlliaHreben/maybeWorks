const ApiError = require('../services/apiError')

const handleError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    if (err instanceof ApiError) {
      ctx.status = 400
      ctx.body = {
        ok: false,
        error: {
          code: err.code,
          message: err.message
        }
      }
    } else {
      throw err
    }

  }
}

module.exports = {handleError}
