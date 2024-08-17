import ConnectionStatusLabel from '@/components/ConnectionStatusLabel'
import { WS_URL } from '@/lib/consts/terminal/bitmex'
import useWebSocket from 'react-use-websocket'

const ConnectionStatus = (): JSX.Element => {
  const { readyState } = useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  })

  return <ConnectionStatusLabel state={readyState} />
}

export default ConnectionStatus
