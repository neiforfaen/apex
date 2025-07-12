import { env } from 'hono/adapter'
import { createMiddleware } from 'hono/factory'
import type { Env } from '../lib/types'

const environment = createMiddleware(async (c, next) => {
  const { VALORANT_API_KEY, NODE_ENV } = env<Env>(c, 'edge-light')

  c.set('VALORANT_API_KEY', VALORANT_API_KEY)
  c.set('NODE_ENV', NODE_ENV)

  await next()
})

export default environment
