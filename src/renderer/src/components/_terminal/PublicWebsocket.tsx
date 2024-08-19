import {
  TABLE_NAME_INSTRUMENT,
  TABLE_NAME_ORDERBOOK,
  TABLE_NAME_RECENTTRADES,
  WS_BASE_URL,
  WS_ENDPOINT
} from '@/lib/consts/terminal/bitmex'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import type { TorderBook } from '@/lib/types/bitmex/TorderBook'
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades'
import BitMEXClient from '@/lib/utils/BitMEXClient'
import { useVault } from '@/lib/vault'
import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

const bitmexClient = new BitMEXClient<TorderBook | TRecentTrades | TInstrument>()

const PublicWebsocket = (): JSX.Element => {
  const ticker = useVault((state) => state.terminal.ticker)
  const setPublicData = useVault((state) => state.setPublicData)

  const { sendJsonMessage } = useWebSocket(WS_BASE_URL + WS_ENDPOINT, {
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
        setPublicData(
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

  return <></>
}

export default PublicWebsocket
