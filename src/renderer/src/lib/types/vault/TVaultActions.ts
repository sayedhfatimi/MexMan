import type { Layout } from 'react-grid-layout'
import type { TAPIKey } from './TAPIKey'
import type { TVaultState } from './TVaultState'

export type TVaultActions = {
  setPublicData: (payload: TVaultState['data_public']) => void
  setPrivateData: (payload: TVaultState['data_private']) => void
  addKey: (payload: TAPIKey) => void
  removeKey: (payload: TAPIKey) => void
  setTicker: (payload: TVaultState['terminal']['ticker']) => void
  setVisibleTrades: (payload: TVaultState['terminal']['visibleTrades']) => void
  setLayout: (payload: Layout[]) => void
  resetLayout: () => void
  addComponent: (payload: Layout) => void
  removeComponent: (payload: Layout) => void
  toggleComponentState: (payload: keyof TVaultState['terminal']['componentState']) => void
}
