import { defaultTerminalLayout } from '@/lib/consts/terminal/gridConfig'
import { DEFAULT_TICKER, DEFAULT_VISIBLE_TRADES } from '@/lib/consts/UI'
import type { TVaultState } from '@/lib/types/vault/TVaultState'

export const defaultState: TVaultState = {
  _data: {} as TVaultState['_data'],
  APIKeys: [] as TVaultState['APIKeys'],
  terminal: {
    ticker: DEFAULT_TICKER,
    visibleTrades: DEFAULT_VISIBLE_TRADES,
    activeComponents: defaultTerminalLayout as TVaultState['terminal']['activeComponents'],
    inactiveComponents: [] as TVaultState['terminal']['inactiveComponents']
  } as TVaultState['terminal']
}
