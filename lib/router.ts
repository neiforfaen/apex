import { Hono } from 'hono'
import type { Bindings } from './types'

export const createRouter = (basePath: string) =>
  new Hono<Bindings>({ strict: false }).basePath(basePath)

export type Route = ReturnType<typeof createRouter>
