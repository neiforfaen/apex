import type { Context, NotFoundHandler } from 'hono'
import { statusCodes, statusPhrases } from '../lib/statix'

const notFoundHandler: NotFoundHandler = (c: Context) => {
  return c.json(
    {
      message: `${statusPhrases.NOT_FOUND} - The requested resource @ ${c.req.path} could not be found.`,
    },
    statusCodes.NOT_FOUND
  )
}

export default notFoundHandler
