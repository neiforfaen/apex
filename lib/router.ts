import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { openAPISpecs } from 'hono-openapi'
import {
  environment,
  errorHandler,
  notFoundHandler,
  redisCache,
} from '../middlewares'
import type { Bindings } from './types'

export const createRouter = (basePath: string) =>
  new Hono<Bindings>({ strict: false }).basePath(basePath)

export const createBaseRouter = () => {
  const app = new Hono<Bindings>({ strict: false })
    .onError(errorHandler)
    .notFound(notFoundHandler)
    .use(environment)
    .use(redisCache)
    .use('/api', cors({ origin: '/api' }))

  app.get(
    '/openapi.json',
    openAPISpecs(app, {
      documentation: {
        info: {
          title: 'Apex API',
          version: '1.0.0',
          description:
            'Easily create commands to return formatted messages for in-game ranks/records, to be used on various streaming platforms.',
        },
        servers: [
          {
            url: 'https://apex-alpha-snowy.vercel.app/',
            description: 'Production',
          },
        ],
        tags: [
          {
            name: 'Root',
            description: 'Root level endpoints for the API.',
          },
          {
            name: 'Valorant',
            description:
              'Valorant related endpoints for fetching rank/records.',
          },
        ],
      },
    })
  )

  return app
}

export type Route = ReturnType<typeof createRouter>
