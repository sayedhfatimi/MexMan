import type { TBitMEXClient_DATA } from '@/lib/types/bitmex/TBitMEXClient_DATA'
import type { TBitMEXClient_KEYS } from '@/lib/types/bitmex/TBitMEXClient_KEYS'
import type { TWebSocketResponse } from '@/lib/types/bitmex/TWebSocketResponse'
import _ from 'lodash'

class BitMEXClient<T> {
  // private properties
  private data_public: TBitMEXClient_DATA = {}
  private _KEYS: TBitMEXClient_KEYS = {}
  private STORE_MAX_LENGTH = 10_000

  public deltaParser(
    table: string,
    key: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    switch (wsResponse.action) {
      case 'partial': {
        return this._partial(table, key, wsResponse)
      }

      case 'insert': {
        return this._insert(table, key, wsResponse)
      }

      case 'update': {
        return this._update(table, key, wsResponse)
      }

      case 'delete': {
        return this._delete(table, key, wsResponse)
      }
    }
  }

  // deltaParser Actions

  private _partial(
    table: string,
    key: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    if (!this.data_public[table]) this.data_public[table] = {}
    const wsData = wsResponse.data || []

    this.data_public[table][key] = wsData
    this._KEYS[table] = wsResponse.keys!

    return this.data_public
  }

  private _insert(
    table: string,
    key: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this.data_public[table][key]

    const mutableStore = [...store, ...wsResponse.data] as T[]

    if (mutableStore.length > this.STORE_MAX_LENGTH) {
      mutableStore.splice(0, mutableStore.length - this.STORE_MAX_LENGTH)
    }

    return this.replaceStore(table, key, mutableStore)
  }

  private _update(
    table: string,
    key: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this.data_public[table][key]

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

    return this.replaceStore(table, key, mutableStore)
  }

  private _delete(
    table: string,
    key: string,
    wsResponse: TWebSocketResponse<T>
  ): TBitMEXClient_DATA {
    const store = this.data_public[table][key]

    let mutableStore = [...store] as T[]

    for (let i = 0; i < wsResponse.data.length; i++) {
      const criteria = _.pick(wsResponse.data[i], this._KEYS[table])
      const itemToRemove: T = _.find(mutableStore, criteria) as T

      if (itemToRemove) {
        mutableStore = [..._.without(mutableStore, itemToRemove)] as T[]
      }
    }

    return this.replaceStore(table, key, mutableStore)
  }

  // deltaParser Helper Functions

  private replaceStore(table: string, key: string, newData: T[]): TBitMEXClient_DATA {
    if (this.data_public[table][key] && !Array.isArray(this.data_public[table][key])) {
      this.data_public[table][key] = newData[0] as T[]
    } else {
      this.data_public[table][key] = newData
    }
    return this.data_public
  }

  private updateItem(item: T, newData: T): T {
    return { ...item, ...newData }
  }
}

export default BitMEXClient
