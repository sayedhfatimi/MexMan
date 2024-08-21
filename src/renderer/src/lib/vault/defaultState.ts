import { defaultLayout } from '@/lib/consts/terminal/gridConfig'
import { DEFAULT_TICKER, DEFAULT_VISIBLE_TRADES } from '@/lib/consts/UI'
import type { TVaultState } from '@/lib/types/vault/TVaultState'
import type { Layout } from 'react-grid-layout'

export const defaultState: TVaultState = {
  data_public: {} as TVaultState['data_public'],
  data_private: {} as TVaultState['data_private'],
  APIKeys: [] as TVaultState['APIKeys'],
  terminal: {
    ticker: DEFAULT_TICKER,
    visibleTrades: DEFAULT_VISIBLE_TRADES,
    activeComponents: defaultLayout as Layout[],
    inactiveComponents: [] as Layout[]
  } as TVaultState['terminal']
}
