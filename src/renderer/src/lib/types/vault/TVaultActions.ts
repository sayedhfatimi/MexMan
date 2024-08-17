import type { Layout } from 'react-grid-layout'
import type { TAPIKey } from './TAPIKey'
import type { TVaultState } from './TVaultState'

export type TVaultActions = {
  setData: (payload: TVaultState['_data']) => void
  addKey: (payload: TAPIKey) => void
  removeKey: (payload: TAPIKey) => void
  setTicker: (payload: TVaultState['terminal']['ticker']) => void
  setVisibleTrades: (payload: TVaultState['terminal']['visibleTrades']) => void
  setTerminalLayout: (payload: Layout[]) => void
  resetTerminalLayout: (payload: Layout[]) => void
  addComponent: (payload: Layout) => void
  removeComponent: (payload: Layout) => void
}
