import KBShortcutLabel from '@/components/KBShortcutLabel'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { KB_SHORTCUT_TICKER_LIST } from '@/lib/consts/UI'
import { InstrumentMap } from '@/lib/consts/terminal/bitmex'
import useKBShortcut from '@/lib/hooks/useKBShortcuts'
import useTickerVolumes from '@/lib/hooks/useTickerVolumes'
import useTickers from '@/lib/hooks/useTickers'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import { numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import { useState } from 'react'
import { LuChevronDown, LuChevronUp, LuX } from 'react-icons/lu'

const TickerList = (): JSX.Element => {
  const [searchedVal, setSearchedVal] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: 'turnover24h',
    direction: 'descending'
  } as {
    key: keyof TInstrument
    direction: string
  })
  const [quoteCurrencyFilter, setQuoteCurrencyFilter] = useState<string | null>(null)
  const ticker = useVault.use.terminal().ticker
  const setTicker = useVault.use.setTicker()

  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_TICKER_LIST)
  const { data: tickerData, isLoading: tickerDataStatus } = useTickers()
  const { data: volumeData, isLoading: volumeDataStatus } = useTickerVolumes()

  const requestSort = (key: keyof TInstrument): void => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const clearFilter = (): void => {
    setQuoteCurrencyFilter(null)
    setSearchedVal('')
  }

  if (tickerDataStatus || volumeDataStatus || !tickerData || !volumeData)
    return (
      <div className="h-full place-content-center place-items-center text-center">
        <Spinner />
      </div>
    )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergedData: any[] = []

  for (let i = 0; i < tickerData.length; i++) {
    mergedData.push({
      ...tickerData[i],
      ...volumeData.find((item: { symbol: string }) => item.symbol === tickerData[i].symbol)
    })
  }

  const filteredData = mergedData
    .filter((ticker) => ticker.state === 'Open')
    .filter((ticker) => {
      if (quoteCurrencyFilter === null) return true
      if (ticker.quoteCurrency === quoteCurrencyFilter) return true
      return false
    })
    .filter(
      (ticker) =>
        !searchedVal.length ||
        ticker.symbol.toString().toLowerCase().includes(searchedVal.toString().toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="space-x-2">
          <span>{ticker ? `Ticker: ${ticker}` : 'Select a ticker...'}</span>
          <KBShortcutLabel char={KB_SHORTCUT_TICKER_LIST} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[900px] select-none space-y-4">
        <Input
          placeholder="Search for a ticker..."
          onChange={(e) => setSearchedVal(e.target.value)}
          className="rounded-none"
        />
        <div className="flex flex-row items-center justify-between border px-4 py-2">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">Filter by Quote Currency</span>
            <div className="flex flex-row space-x-4">
              {['USDT', 'USD', 'XBT', 'ETH', 'EUR'].map((currency) => (
                <div
                  key={currency}
                  className={classNames({
                    'bg-secondary px-4 py-2 font-mono text-xs hover:bg-primary hover:text-white dark:hover:text-black':
                      true,
                    'bg-slate-700 text-white dark:bg-slate-100 dark:text-slate-900':
                      currency === quoteCurrencyFilter
                  })}
                  onClick={() => setQuoteCurrencyFilter(currency)}
                >
                  <div>{currency}</div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="space-x-2 rounded-none"
            variant="outline"
            size="sm"
            onClick={clearFilter}
          >
            <LuX />
            <span>Clear Filter</span>
          </Button>
        </div>
        <div className="flex h-[300px] flex-col font-mono">
          <div className="flex-grow overflow-y-scroll">
            <table className="relative w-full table-fixed">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-secondary py-2">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => requestSort('symbol')}
                      className="flex flex-row items-center space-x-2"
                    >
                      <span>Ticker</span>
                      {sortConfig.key === 'symbol' && sortConfig.direction === 'ascending' && (
                        <LuChevronUp />
                      )}
                      {sortConfig.key === 'symbol' && sortConfig.direction === 'descending' && (
                        <LuChevronDown />
                      )}
                    </Button>
                  </th>
                  <th className="sticky top-0 bg-secondary py-2">
                    <div className="inline-flex w-full justify-end">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => requestSort('lastPrice')}
                        className="flex flex-row items-center space-x-2"
                      >
                        {sortConfig.key === 'lastPrice' && sortConfig.direction === 'ascending' && (
                          <LuChevronUp />
                        )}
                        {sortConfig.key === 'lastPrice' &&
                          sortConfig.direction === 'descending' && <LuChevronDown />}
                        <span>Last Price</span>
                      </Button>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-secondary py-2">
                    <div className="inline-flex w-full justify-end">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => requestSort('lastChangePcnt')}
                        className="flex flex-row items-center space-x-2"
                      >
                        {sortConfig.key === 'lastChangePcnt' &&
                          sortConfig.direction === 'ascending' && <LuChevronUp />}
                        {sortConfig.key === 'lastChangePcnt' &&
                          sortConfig.direction === 'descending' && <LuChevronDown />}
                        <span>24h Change</span>
                      </Button>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-secondary py-2">
                    <div className="inline-flex w-full justify-end">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => requestSort('turnover24h')}
                        className="flex flex-row items-center space-x-2"
                      >
                        {sortConfig.key === 'turnover24h' &&
                          sortConfig.direction === 'ascending' && <LuChevronUp />}
                        {sortConfig.key === 'turnover24h' &&
                          sortConfig.direction === 'descending' && <LuChevronDown />}
                        <span>24h Volume (USD)</span>
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredData.map((ticker) => (
                  <tr
                    key={ticker.symbol}
                    className={classNames({
                      'group cursor-pointer transition-colors hover:bg-secondary': true,
                      'bg-primary-foreground': ticker.symbol === ticker
                    })}
                    onClick={() => setTicker(ticker.symbol)}
                  >
                    <td className="px-3 py-1">
                      <div className="flex flex-row items-center justify-between">
                        <span>{ticker.symbol}</span>
                        <div className="flex flex-col items-end text-xs text-muted-foreground group-hover:text-black dark:group-hover:text-white">
                          {InstrumentMap[ticker.typ]}
                        </div>
                      </div>
                    </td>
                    <td
                      className={classNames({
                        'px-3 py-1 text-right': true,
                        'text-green-600 dark:text-green-600': ticker.lastChangePcnt > 0,
                        'text-red-600 dark:text-red-600': ticker.lastChangePcnt < 0
                      })}
                    >
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-black dark:group-hover:text-white">
                          {ticker.quoteCurrency}
                        </span>
                        <span>{numberParser(ticker.lastPrice)}</span>
                      </div>
                    </td>
                    <td
                      className={classNames({
                        'px-3 py-1 text-right': true,
                        'text-green-600 dark:text-green-600': ticker.lastChangePcnt > 0,
                        'text-red-600 dark:text-red-600': ticker.lastChangePcnt < 0
                      })}
                    >
                      {`${ticker.lastChangePcnt > 0 ? '+' : ''}${numberParser(ticker.lastChangePcnt * 100)} %`}
                    </td>
                    <td className="px-3 py-1 text-right font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                      }).format(ticker.turnover24h)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TickerList