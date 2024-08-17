import Spinner from '@/components/Spinner'
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI'
import { TABLE_NAME_INSTRUMENT } from '@/lib/consts/terminal/bitmex'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import { numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import { LuArrowDown, LuArrowUp, LuMinus } from 'react-icons/lu'

const TickerStrip = (): JSX.Element => {
  const ticker = useVault.use.terminal().ticker
  const data: TInstrument[] =
    useVault((state) => state?._data?.[TABLE_NAME_INSTRUMENT]?.[ticker]) || []

  if (!data || data.length === 0)
    return (
      <div className="h-full place-content-center place-items-center text-center">
        <Spinner />
      </div>
    )

  return (
    <>
      {data.map((ticker) => (
        <div
          key={ticker.symbol}
          className="flex select-none flex-row items-center space-x-2 divide-x-2 font-mono"
        >
          <div className="ticker-strip-item-hover flex flex-row items-center gap-x-2 px-2 py-1">
            <div
              className={classNames({
                'text-green-600 dark:text-green-600': ticker.lastTickDirection === 'PlusTick',
                'text-red-600 dark:text-red-600': ticker.lastTickDirection === 'MinusTick'
              })}
            >
              {ticker.lastTickDirection === 'PlusTick' ? (
                <LuArrowUp size={ICON_SIZE_MEDIUM} />
              ) : ticker.lastTickDirection === 'MinusTick' ? (
                <LuArrowDown size={ICON_SIZE_MEDIUM} />
              ) : (
                <LuMinus size={ICON_SIZE_MEDIUM} />
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-right text-xs text-muted-foreground">Last Price</div>
              <div
                className={classNames({
                  'text-green-600 dark:text-green-600': ticker.lastTickDirection === 'PlusTick',
                  'text-red-600 dark:text-red-600': ticker.lastTickDirection === 'MinusTick'
                })}
              >
                {numberParser(ticker.lastPrice)}
              </div>
            </div>
          </div>
          <div className="ticker-strip-item-hover hidden flex-col px-2 py-1 xl:flex">
            <div className="text-right text-xs text-muted-foreground">24h %</div>
            <div
              className={classNames({
                'text-green-600 dark:text-green-600': ticker.lastChangePcnt > 0,
                'text-red-600 dark:text-red-600': ticker.lastChangePcnt < 0
              })}
            >
              {`${ticker.lastChangePcnt > 0 ? '+' : ''}${numberParser(ticker.lastChangePcnt * 100)} %`}
            </div>
          </div>
          <div className="ticker-strip-item-hover hidden flex-col px-2 py-1 2xl:flex">
            <div className="text-right text-xs text-muted-foreground">24h High</div>
            <div>{numberParser(ticker.highPrice)}</div>
          </div>
          <div className="ticker-strip-item-hover hidden flex-col px-2 py-1 2xl:flex">
            <div className="text-right text-xs text-muted-foreground">24h Low</div>
            <div>{numberParser(ticker.lowPrice)}</div>
          </div>
          <div className="ticker-strip-item-hover hidden flex-col px-2 py-1 2xl:flex">
            <div className="text-right text-xs text-muted-foreground">VWAP</div>
            <div>{numberParser(ticker.vwap)}</div>
          </div>
          <div className="ticker-strip-item-hover hidden flex-col px-2 py-1 xl:flex">
            <div className="text-right text-xs text-muted-foreground">24h Volume</div>
            <div className="text-right">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
              }).format(ticker.volume24h)}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default TickerStrip
