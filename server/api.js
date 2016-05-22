import Router from 'koa-router'

const api = new Router({ prefix: '/api' })

api.get('/foo', foo)

async function foo(ctx) {
  ctx.body = { foo: true }
}

export default api
