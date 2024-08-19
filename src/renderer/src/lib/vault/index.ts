import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import type { TVaultActions } from '@/lib/types/vault/TVaultActions'
import type { TVaultState } from '@/lib/types/vault/TVaultState'
import _ from 'lodash'
import type { Layout } from 'react-grid-layout'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultState } from './defaultState'

type TVault = TVaultState & TVaultActions

export const useVault = create<TVault>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setPublicData: (payload: TVaultState['data_public']): void =>
        set({
          ...get(),
          data_public: payload
        }),
      setPrivateData: (payload: TVaultState['data_private']): void =>
        set({
          ...get(),
          data_private: payload
        }),
      addKey: (payload: TAPIKey): void =>
        set({
          ...get(),
          APIKeys: [...get().APIKeys, payload]
        }),
      removeKey: (payload: TAPIKey): void =>
        set({
          ...get(),
          APIKeys: _.without(get().APIKeys, payload)
        }),
      setTicker: (payload: TVaultState['terminal']['ticker']): void =>
        set({
          ...get(),
          terminal: { ...get().terminal, ticker: payload }
        }),
      setVisibleTrades: (payload: TVaultState['terminal']['visibleTrades']): void =>
        set({
          ...get(),
          terminal: { ...get().terminal, visibleTrades: payload }
        }),
      setLayout: (payload: Layout[]): void =>
        set({
          ...get(),
          terminal: { ...get().terminal, layout: payload }
        }),
      toggleComponent: (payload: keyof TVaultState['terminal']['components']): void =>
        set({
          ...get(),
          terminal: {
            ...get().terminal,
            components: {
              ...get().terminal.components,
              [payload]: !get().terminal.components[payload]
            }
          }
        })
    }),
    {
      name: 'vault',
      partialize: (state) => ({
        APIKeys: state.APIKeys,
        terminal: _.pick(state.terminal, ['ticker', 'visibleTrades', 'layout', 'components'])
      })
    }
  )
)
