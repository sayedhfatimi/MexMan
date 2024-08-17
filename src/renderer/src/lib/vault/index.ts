import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import type { TVaultActions } from '@/lib/types/vault/TVaultActions'
import type { TVaultState } from '@/lib/types/vault/TVaultState'
import _ from 'lodash'
import type { Layout } from 'react-grid-layout'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSelectors } from './createSelectors'
import { defaultState } from './defaultState'

type TVault = TVaultState & TVaultActions

const vault = create<TVault>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setData: (payload: TVaultState['_data']): void =>
        set({
          ...get(),
          _data: payload
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
      setTerminalLayout: (payload: Layout[]): void =>
        set({
          ...get(),
          terminal: { ...get().terminal, activeComponents: payload }
        }),
      resetTerminalLayout: (payload: Layout[]): void =>
        set({
          ...get(),
          terminal: {
            ...get().terminal,
            activeComponents: payload,
            inactiveComponents: []
          }
        }),
      addComponent: (payload: Layout): void =>
        set({
          ...get(),
          terminal: {
            ...get().terminal,
            activeComponents: [...get().terminal.activeComponents, payload],
            inactiveComponents: _.reject(
              get().terminal.inactiveComponents,
              (o) => o.i === payload.i
            )
          }
        }),
      removeComponent: (payload: Layout): void =>
        set({
          ...get(),
          terminal: {
            ...get().terminal,
            activeComponents: _.reject(get().terminal.activeComponents, (o) => o.i === payload.i),
            inactiveComponents: [...get().terminal.inactiveComponents, payload]
          }
        })
    }),
    {
      name: 'vault',
      partialize: (state) => ({
        APIKeys: state.APIKeys,
        terminal: _.pick(state.terminal, [
          'ticker',
          'visibleTrades',
          'activeComponents',
          'inactiveComponents'
        ])
      })
    }
  )
)

export const useVault = createSelectors(vault)