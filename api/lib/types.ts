export type Bindings = {
  Variables: {
    VALORANT_API_KEY: string
    NODE_ENV: 'development' | 'production'
  }
}

export type Env = {
  VALORANT_API_KEY: string
  NODE_ENV: string
}

export type ValorantRankResponse = {
  data: {
    data: {
      current_data: {
        currenttierpatched: string
        ranking_in_tier: number
      }
      highest_rank: {
        patched_tier: string
        season: string
      }
    }
  }
}
