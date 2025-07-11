import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import type { Bindings } from './lib/types'

export const config = {
  runtime: 'edge',
}

const app = new Hono<Bindings>({ strict: false }).use(cors({ origin: '*' }))

app.get('/', (c) => {
  return c.text('@neiforfaen/apex | Root')
})

export default handle(app)
