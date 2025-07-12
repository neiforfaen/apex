import { Scalar } from '@scalar/hono-api-reference'
import type { Context } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { z } from 'zod'
import { createRouter } from '../lib/router'
import { statusCodes } from '../lib/statix'
import type { Bindings } from '../lib/types'

const RootResponseSchema = z.literal(
  '@neiforfaen/apex | View the documentation at /docs'
)

const HealthResponseSchema = z.object({
  status: z.string(),
})

const root = createRouter('/')

root.get(
  '/',
  describeRoute({
    description: 'Returns a message at the root of the API.',
    responses: {
      [statusCodes.OK]: {
        description: 'Successful response',
        content: {
          'text/plain': { schema: resolver(RootResponseSchema) },
        },
      },
    },
    operationId: 'Root',
    tags: ['Root'],
  }),
  (c) =>
    c.text('@neiforfaen/apex | View the documentation at /docs', statusCodes.OK)
)

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

root.get(
  '/docs',
  Scalar((c: Context<Bindings>) => {
    const NODE_ENV = c.get('NODE_ENV')

    return {
      url: '/openapi.json',
      proxyUrl:
        NODE_ENV === 'development' ? 'https://proxy.scalar.com' : undefined,
      pageTitle: 'Apex API Docs | @neiforfaen/apex',
      theme: 'moon',
    }
  })
)

export default root
