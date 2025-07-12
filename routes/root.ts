import { Scalar } from '@scalar/hono-api-reference'
import type { Context } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { z } from 'zod'
import { createRouter } from '../lib/router'
import { statusCodes } from '../lib/statix'
import type { Bindings } from '../lib/types'

const HealthResponseSchema = z.object({
  status: z.string(),
})

const root = createRouter('/')

// GET: Health Check
root.get(
  '/health',
  describeRoute({
    description: 'Returns the health status of the API.',
    responses: {
      [statusCodes.OK]: {
        description: 'Successful response',
        content: {
          'application/json': { schema: resolver(HealthResponseSchema) },
        },
      },
    },
    operationId: 'Health',
    tags: ['Root'],
  }),
  (c) => c.json({ status: 'OK' }, statusCodes.OK)
)

// GET: API Documentation
root.get(
  '/docs',
  Scalar((c: Context<Bindings>) => {
    const NODE_ENV = c.get('NODE_ENV')

    return {
      url: '/openapi.json',
      proxyUrl:
        NODE_ENV === 'development' ? 'https://proxy.scalar.com' : undefined,
      pageTitle: 'Apex API Docs | @neiforfaen/apex',
      theme: 'solarized',
    }
  })
)

export default root
