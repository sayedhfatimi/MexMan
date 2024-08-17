import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_STALE_TIME } from '@/lib/consts/ReactQuery'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useTickers() {
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
