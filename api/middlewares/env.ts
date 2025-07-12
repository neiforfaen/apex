import { env } from 'hono/adapter'
import { createMiddleware } from 'hono/factory'
import type { Env } from '../lib/types'

const environment = createMiddleware(async (c, next) => {
  const { VAL_API_KEY, NODE_ENV } = env<Env>(c, 'edge-light')

  c.set('VAL_API_KEY', VAL_API_KEY)
  c.set('NODE_ENV', NODE_ENV)

  await next()
})

export default environment
