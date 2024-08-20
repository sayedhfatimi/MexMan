import { REACT_QUERY_STALE_TIME } from '@/lib/consts/ReactQuery'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { TInstrument } from '../types/bitmex/TInstrument'

export default function useTickers(): UseQueryResult<TInstrument[], Error> {
  return useQuery({
    queryKey: ['tickers'],
    queryFn: async () =>
      await window.electron.ipcRenderer.invoke(
        'bitmex:RESTRequest',
        'GET',
        '/api/v1/instrument/active'
      ),
    staleTime: REACT_QUERY_STALE_TIME,
    retry: 3
  })
}
