import { createMiddleware } from 'hono/factory'
import { getCachedValue } from '../lib/redis'
import { statusCodes } from '../lib/statix'

const cache = createMiddleware(async (c, next) => {
  const { format } = c.req.query()
  const key = c.req.path

  if (!key.includes('/api')) {
    await next()
    return
  }

  const cachedResponse = await getCachedValue({ key, ctx: c })

  if (cachedResponse) {
    if (format === 'text') {
      return c.text(cachedResponse as string, statusCodes.OK)
    }
    return c.json({ message: cachedResponse, cached: true }, statusCodes.OK)
  }

  await next()
})

export default cache
