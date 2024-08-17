import { REACT_QUERY_STALE_TIME } from '@/lib/consts/ReactQuery'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useTickerVolumes() {
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
