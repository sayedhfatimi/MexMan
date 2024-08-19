import type { TBitMEXClient_DATA } from '@/lib/types/bitmex/TBitMEXClient_DATA'
import type { Layout } from 'react-grid-layout'
import type { TAPIKey } from './TAPIKey'

export type TVaultState = {
  data_public: TBitMEXClient_DATA
  data_private: TBitMEXClient_DATA
  APIKeys: TAPIKey[]
  terminal: {
    ticker: string
    visibleTrades: number
    layout: Layout[]
    components: {
      Chart: boolean
      Orderbook: boolean
      'Order Form': boolean
      'Recent Trades': boolean
      'Positions & Orders': boolean
      'Contract Information': boolean
      'Last Price': boolean
      'Depth Chart': boolean
    }
  }
}
