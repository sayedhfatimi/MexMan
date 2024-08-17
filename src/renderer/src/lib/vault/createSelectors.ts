import type { UseBoundStore, StoreApi } from 'zustand'
import type { WithSelectors } from '@/lib/types/vault/WithSelectors'

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
): WithSelectors<S> => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as object)[k] = (): never => store((s) => s[k as keyof typeof s])
  }

  return store
}
