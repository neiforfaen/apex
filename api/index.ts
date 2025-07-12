import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import type { Route } from './lib/router'
import type { Bindings } from './lib/types'
import {
  environment,
  errorHandler,
  notFoundHandler,
  redisCache,
} from './middlewares'
import root from './routes/root'
import valorantRouter from './routes/valorant'

export const config = {
  runtime: 'edge',
}

const app = new Hono<Bindings>({ strict: false })
  .onError(errorHandler)
  .notFound(notFoundHandler)
  .use(environment)
  .use(redisCache)
  .use(cors({ origin: '/api' }))

app.route('/', root)

const routes: Route[] = [valorantRouter]

for (const route of routes) {
  app.route('/api', route)
}

export default handle(app)
