import {
  TABLE_NAME_INSTRUMENT,
  TABLE_NAME_ORDER,
  TABLE_NAME_ORDERBOOK,
  TABLE_NAME_POSITION,
  TABLE_NAME_RECENTTRADES,
  TABLE_NAME_WALLET,
  WS_URL
} from '@/lib/consts/terminal/bitmex'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import type { TOrder } from '@/lib/types/bitmex/TOrder'
import type { TorderBook } from '@/lib/types/bitmex/TorderBook'
import type { TPosition } from '@/lib/types/bitmex/TPosition'
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades'
import type { TWallet } from '@/lib/types/bitmex/TWallet'
import BitMEXClient from '@/lib/utils/BitMEXClient'
import { useVault } from '@/lib/vault'
import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

const bitmexClient = new BitMEXClient<
  TorderBook | TRecentTrades | TWallet | TInstrument | TOrder | TPosition
>()

const WebsocketConnector = (): JSX.Element => {
  const ticker = useVault.use.terminal().ticker
  const setData = useVault.use.setData()
  const APIKeys = useVault.use.APIKeys()

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
    retryOnError: true,
    onOpen: () => {
      sendJsonMessage({
        op: 'subscribe',
        args: [
          `${TABLE_NAME_ORDERBOOK}:${ticker}`,
          `${TABLE_NAME_RECENTTRADES}:${ticker}`,
          `${TABLE_NAME_INSTRUMENT}:${ticker}`
        ]
      })
    },
    onMessage: (event: WebSocketEventMap['message']) => {
      if (event !== undefined && event !== null)
        setData(
          bitmexClient.deltaParser(JSON.parse(event.data).table, ticker, JSON.parse(event.data))
        )
    }
  })

  useEffect(() => {
    sendJsonMessage({
      op: 'unsubscribe',
      args: [TABLE_NAME_ORDERBOOK, TABLE_NAME_RECENTTRADES, TABLE_NAME_INSTRUMENT]
    })
    sendJsonMessage({
      op: 'subscribe',
      args: [
        `${TABLE_NAME_ORDERBOOK}:${ticker}`,
        `${TABLE_NAME_RECENTTRADES}:${ticker}`,
        `${TABLE_NAME_INSTRUMENT}:${ticker}`
      ]
    })
  }, [ticker])

  useEffect(() => {
    for (const api of APIKeys) {
      if (api) {
        Promise.resolve(getAuth('GET', '/realtime', api.key, api.secret)).then((res) => {
          sendJsonMessage({
            op: 'authKey',
            args: [res['api-key'], res['api-expires'], res['api-signature']]
          })

          sendJsonMessage({
            op: 'subscribe',
            args: [TABLE_NAME_WALLET, TABLE_NAME_ORDER, TABLE_NAME_POSITION]
          })
        })
      }
    }
  }, [APIKeys])

  return <></>
}

async function getAuth(verb: string, path: string, key: string, secret: string): Promise<string> {
  return await window.electron.ipcRenderer.invoke('bitmex:getAuth', verb, path, key, secret)
}

export default WebsocketConnector
