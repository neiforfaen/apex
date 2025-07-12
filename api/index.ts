import { handle } from 'hono/vercel'
import { createBaseRouter, type Route } from '../lib/router'
import root from '../routes/root'
import valorantRouter from '../routes/valorant'

export const config = {
  runtime: 'edge',
}

const app = createBaseRouter()

app.route('/', root)

const routes: Route[] = [valorantRouter]

for (const route of routes) {
  app.route('/api', route)
}

export default handle(app)
