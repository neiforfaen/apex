import get from 'axios'
import { describeRoute } from 'hono-openapi'
import { resolver, validator as zValidator } from 'hono-openapi/zod'
import { z } from 'zod'
import { setCachedValue } from '../../lib/redis'
import { createRouter } from '../../lib/router'
import { statusCodes, statusPhrases } from '../../lib/statix'
import type { ValorantRankResponse } from '../../lib/types'

const RankRequestParamSchema = z.object({
  region: z.enum(['na', 'eu', 'ap', 'kr', 'br', 'latam'], 'Region is required'),
  name: z.string().min(1, 'Name is required'),
  tag: z.string().min(1, 'Tag is required'),
})

const RankRequestQuerySchema = z.object({
  style: z.enum(['minimal', 'rank', 'peak']).optional(),
  format: z.literal('text').optional(),
})

const RankResponseSchema = z.object({
  message: z.string(),
})

const valorantRouter = createRouter('/valorant')

// GET: Current Valorant Rank
valorantRouter.get(
  '/v1/rank/:region/:name/:tag',
  describeRoute({
    description:
      'Returns the rank of the specified player in the path paramters.',
    responses: {
      [statusCodes.OK]: {
        description: 'Successful response',
        content: {
          'application/json': { schema: resolver(RankResponseSchema) },
        },
      },
      [statusCodes.BAD_REQUEST]: {
        description: 'Bad request response',
        content: {
          'application/json': {
            schema: resolver(z.object({ error: z.string() })),
          },
        },
      },
      [statusCodes.NOT_FOUND]: {
        description: 'Player not found response',
        content: {
          'application/json': {
            schema: resolver(z.object({ error: z.string() })),
          },
        },
      },
      [statusCodes.INTERNAL_SERVER_ERROR]: {
        description: 'Internal server error response',
        content: {
          'application/json': {
            schema: resolver(z.object({ error: z.string() })),
          },
        },
      },
    },
    operationId: 'GetValorantRank',
    tags: ['Valorant'],
  }),
  zValidator('param', RankRequestParamSchema),
  zValidator('query', RankRequestQuerySchema),
  async (c) => {
    try {
      const { name, tag, region } = c.req.param()
      const { style, format } = c.req.query()
      const VALORANT_API_KEY = c.get('VALORANT_API_KEY')
      const REDIS_CACHE_KEY = c.req.path

      const {
        data: {
          data: { current_data, highest_rank },
        },
      } = (await get(
        `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}?api_key=${VALORANT_API_KEY}`
      )) as ValorantRankResponse

      if (!current_data) {
        return c.json(
          { error: `${statusPhrases.NOT_FOUND}: ${name}#${tag}` },
          statusCodes.NOT_FOUND
        )
      }

      const { currenttierpatched: currentRank, ranking_in_tier: rr } =
        current_data
      const { patched_tier: peakRank, season: peakRankSeason } = highest_rank

      let messageStr = `${currentRank} [${rr}RR] | Peak: ${peakRank} @ ${peakRankSeason}`

      if (style === 'minimal') {
        messageStr = `${currentRank} [${rr}RR]`
      } else if (style === 'rank') {
        messageStr = `${currentRank}`
      } else if (style === 'peak') {
        messageStr = `${peakRank} @ ${peakRankSeason}`
      }

      await setCachedValue({ key: REDIS_CACHE_KEY, value: messageStr, ctx: c })

      if (format === 'text') {
        return c.text(messageStr, statusCodes.OK)
      }

      return c.json(
        {
          message: messageStr,
        },
        statusCodes.OK
      )
    } catch (error) {
      const { message } = error as Error
      return c.json(
        { error: `${statusPhrases.INTERNAL_SERVER_ERROR}: ${message}` },
        statusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }
)

export default valorantRouter
