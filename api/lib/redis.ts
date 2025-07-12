import { Redis } from '@upstash/redis'
import type { Context } from 'hono'
import { statusCodes, statusPhrases } from './statix'

export const redis = Redis.fromEnv()

type SetCachedValueParams = {
  key: string
  value: string
  ctx: Context
  timeToExpire?: number
}

type GetCachedValueParams = {
  key: string
  ctx: Context
}

export const setCachedValue = async ({
  key,
  value,
  ctx,
  timeToExpire,
}: SetCachedValueParams) => {
  try {
    return await redis.set(key, value, { ex: timeToExpire || 90 })
  } catch (error) {
    return ctx.json(
      {
        error,
        reason: `${statusPhrases.INTERNAL_SERVER_ERROR}: No value could be set for key ${key}`,
      },
      statusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getCachedValue = async ({ key, ctx }: GetCachedValueParams) => {
  try {
    return await redis.get(key)
  } catch (error) {
    return ctx.json(
      {
        error,
        reason: `${statusPhrases.INTERNAL_SERVER_ERROR}: No value could be retrieved for key ${key}`,
      },
      statusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
