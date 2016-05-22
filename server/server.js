import path from 'path'
import Koa from 'koa'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'

import * as config from './config'
import errorHandler from './middleware/errorHandler'
import router from './router'
import api from './api'

const app = new Koa()

// allow both legacy and modern middleware
// https://www.npmjs.com/package/koa-convert
const use = app.use
app.use = x => use.call(app, convert(x))

app.use(errorHandler)
app.use(bodyParser())

//assumes static content will be served from nginx in production
if (/development|test/.test(process.env.NODE_ENV)) {
  const mount = require('koa-mount')
  const serve = require('koa-static')
  const responseTime = require('./middleware/responseTime').default

  app.use(mount('/static', serve(config.assetsRoot)))
  app.use(mount('/static', serve(config.clientRoot)))
  app.use(responseTime)

  if (process.env.NODE_ENV !== 'test') {
    const logger = require('./middleware/logger').default
    app.use(logger)
  }
}

app.use(router.routes())
app.use(api.routes())

// in test environment we instantiate server instances manually
if (process.env.NODE_ENV !== 'test') {
  const { host, port } = config
  app.listen(port, host, () => console.info(`Listening at ${host}:${port}`))
}

export default app
