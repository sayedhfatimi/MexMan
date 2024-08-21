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
    activeComponents: Layout[]
    inactiveComponents: Layout[]
    componentState: { [key: string]: boolean }
  }
}
