import { REACT_QUERY_STALE_TIME } from '@/lib/consts/ReactQuery'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { TInstrumentUSDVolumes } from '../types/bitmex/TInstrumentUSDVolumes'

export default function useTickerVolumes(): UseQueryResult<TInstrumentUSDVolumes[], Error> {
  return useQuery({
    queryKey: ['tickers', 'volumes'],
    queryFn: async () =>
      await window.electron.ipcRenderer.invoke(
        'bitmex:RESTRequest',
        'GET',
        '/api/v1/instrument/usdVolume'
      ),
    staleTime: REACT_QUERY_STALE_TIME,
    retry: 3
  })
}
