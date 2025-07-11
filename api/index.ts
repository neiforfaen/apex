import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import type { Bindings } from './lib/types'

export const config = {
  runtime: 'edge',
}

const app = new Hono<Bindings>()

app.get('/', (c) => {
  return c.text('@neiforfaen/apex | Root')
})

export default handle(app)
