import type { Context, ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { statusCodes, statusPhrases } from '../lib/statix'

const errorHandler: ErrorHandler = (err, c: Context) => {
  const currentStatus =
    'status' in err ? err.status : statusCodes.INTERNAL_SERVER_ERROR

  const statusCode =
    currentStatus !== statusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : statusCodes.INTERNAL_SERVER_ERROR

  const env = c.env?.NODE_ENV || process.env?.NODE_ENV

  return c.json(
    {
      message: err.message || statusPhrases.INTERNAL_SERVER_ERROR,
      stack: env !== 'production' ? err.stack : undefined,
    },
    statusCode
  )
}

export default errorHandler
