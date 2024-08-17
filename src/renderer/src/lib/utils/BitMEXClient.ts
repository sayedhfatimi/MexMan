import type { TWebSocketResponse } from '@/lib/types/bitmex/TWebSocketResponse'
import _ from 'lodash'
import type { TBitMEXClient_DATA } from '../types/bitmex/TBitMEXClient_DATA'
import type { TBitMEXClient_KEYS } from '../types/bitmex/TBitMEXClient_KEYS'

class BitMEXClient<T> {
  public WS_URL = 'wss://ws.bitmex.com/realtime'
  // private properties
  private _DATA: TBitMEXClient_DATA = {}
  private _KEYS: TBitMEXClient_KEYS = {}
  private STORE_MAX_LENGTH = 10_000
  private noSymbolTables = [
    'account',
    'affiliate',
    'funds',
    'insurance',
    'margin',
    'transact',
    'wallet',
    'announcement',
    'connected',
    'chat',
    'publicNotifications',
    'privateNotifications'
  ]

  public deltaParser(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const tableUsesSymbol = this.noSymbolTables.indexOf(table) === -1
    if (!tableUsesSymbol) symbol = '*'

    switch (wsResponse.action) {
      case 'partial': {
        return this._partial(table, symbol, wsResponse)
      }

      case 'insert': {
        return this._insert(table, symbol, wsResponse)
      }

      case 'update': {
        return this._update(table, symbol, wsResponse)
      }

      case 'delete': {
        return this._delete(table, symbol, wsResponse)
      }
    }
  }

  // deltaParser Actions

  private _partial(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    if (!this._DATA[table]) this._DATA[table] = {}
    const wsData = wsResponse.data || []

    this._DATA[table][symbol] = wsData
    this._KEYS[table] = wsResponse.keys!

    return this._DATA
  }

  private _insert(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this._DATA[table][symbol]

    const mutableStore = [...store, ...wsResponse.data] as T[]

    if (mutableStore.length > this.STORE_MAX_LENGTH) {
      mutableStore.splice(0, mutableStore.length - this.STORE_MAX_LENGTH)
    }

    return this.replaceStore(table, symbol, mutableStore)
  }

  private _update(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this._DATA[table][symbol]

    const mutableStore = [...store] as T[]

    for (let i = 0; i < wsResponse.data.length; i++) {
      let payloadObj = wsResponse.data[i]

      const criteria = _.pick(payloadObj, this._KEYS[table])
      const itemToUpdate: T = _.find(mutableStore, criteria) as T

      if (itemToUpdate) {
        payloadObj = this.updateItem(itemToUpdate, payloadObj)
        mutableStore[mutableStore.indexOf(itemToUpdate)] = payloadObj
      }
    }

    return this.replaceStore(table, symbol, mutableStore)
  }

  private _delete(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this._DATA[table][symbol]

    let mutableStore = [...store] as T[]

    for (let i = 0; i < wsResponse.data.length; i++) {
      const criteria = _.pick(wsResponse.data[i], this._KEYS[table])
      const itemToRemove: T = _.find(mutableStore, criteria) as T

      if (itemToRemove) {
        mutableStore = [..._.without(mutableStore, itemToRemove)] as T[]
      }
    }

    return this.replaceStore(table, symbol, mutableStore)
  }

  // deltaParser Helper Functions

  private replaceStore(table: string, symbol: string, newData: T[]): TBitMEXClient_DATA {
    if (this._DATA[table][symbol] && !Array.isArray(this._DATA[table][symbol])) {
      this._DATA[table][symbol] = newData[0] as T[]
    } else {
      this._DATA[table][symbol] = newData
    }
    return this._DATA
  }

  private updateItem(item: T, newData: T): T {
    return { ...item, ...newData }
  }
}

export default BitMEXClient
