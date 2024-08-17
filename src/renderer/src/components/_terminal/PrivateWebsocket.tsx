import {
  TABLE_NAME_ORDER,
  TABLE_NAME_POSITION,
  TABLE_NAME_WALLET,
  WS_BASE_URL,
  WS_MD_ENDPOINT
} from '@/lib/consts/terminal/bitmex'
import type { TOrder } from '@/lib/types/bitmex/TOrder'
import type { TPosition } from '@/lib/types/bitmex/TPosition'
import type { TWallet } from '@/lib/types/bitmex/TWallet'
import BitMEXClient from '@/lib/utils/BitMEXClient'
import { useVault } from '@/lib/vault'
import useWebSocket from 'react-use-websocket'

const bitmexClient = new BitMEXClient<TWallet | TOrder | TPosition>()

const PrivateWebsocket = (): JSX.Element => {
  const APIKeys = useVault.use.APIKeys()
  const setPrivateData = useVault.use.setPrivateData()

  const { sendJsonMessage } = useWebSocket(WS_BASE_URL + WS_MD_ENDPOINT, {
    share: true,
    shouldReconnect: () => true,
    retryOnError: true,
    onOpen: () => {
      for (const api of APIKeys) {
        sendJsonMessage([1, api.key, api.id])

        Promise.resolve(getAuth('GET', '/realtime', api.key, api.secret)).then((res) => {
          sendJsonMessage([
            0,
            api.key,
            api.id,
            { op: 'authKey', args: [res['api-key'], res['api-expires'], res['api-signature']] }
          ])

          sendJsonMessage([
            0,
            api.key,
            api.id,
            { op: 'subscribe', args: [TABLE_NAME_WALLET, TABLE_NAME_ORDER, TABLE_NAME_POSITION] }
          ])
        })
      }
    },
    onMessage: (event: WebSocketEventMap['message']) => {
      if (event !== undefined && event !== null) {
        setPrivateData(
          bitmexClient.deltaParser(
            JSON.parse(event.data)[3].table,
            JSON.parse(event.data)[2],
            JSON.parse(event.data)[3]
          )
        )
      }
    }
  })

  return <></>
}

async function getAuth(verb: string, path: string, key: string, secret: string): Promise<string> {
  return await window.electron.ipcRenderer.invoke('bitmex:getAuth', verb, path, key, secret)
}

export default PrivateWebsocket
