import path from 'path'
import fs from 'mz/fs'
import Router from 'koa-router'
import { clientRoot } from './config'

const router = new Router()

router.get('/', index)

async function index(ctx) {
  const html = await fs.readFile(path.join(clientRoot, 'index.html'), 'utf8')
  ctx.body = html
}

export default router
