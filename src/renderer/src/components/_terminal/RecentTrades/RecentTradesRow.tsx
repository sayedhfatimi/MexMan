import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades'
import { cn, numberParser } from '@/lib/utils'
import classNames from 'classnames'
import { TiArrowDown, TiArrowUp } from 'react-icons/ti'

const RecentTradesRow = ({
  trade,
  className
}: {
  trade: TRecentTrades
  className?: string
}): JSX.Element => (
  <div
    key={trade.trdMatchID}
    className={cn(
      classNames({
        'grid grid-cols-8 px-1 hover:bg-slate-200/50 dark:hover:bg-slate-200/50': true,
        'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-600': trade.side === 'Buy',
        'bg-red-50 text-red-400 dark:bg-red-950/20 dark:text-red-600': trade.side === 'Sell'
      }),
      className
    )}
  >
    <div className="flex">{trade.side}</div>
    <div className="col-span-2 flex justify-end">{trade.size.toLocaleString()}</div>
    <div className="col-span-3 flex flex-row items-center justify-end space-x-2">
      {trade.tickDirection === 'PlusTick' ? (
        <TiArrowUp size={ICON_SIZE_SMALL} />
      ) : trade.tickDirection === 'MinusTick' ? (
        <TiArrowDown size={ICON_SIZE_SMALL} />
      ) : null}
      <span>{numberParser(trade.price)}</span>
    </div>
    <div className="col-span-2 flex justify-end text-slate-600">
      {new Date(trade.timestamp).toLocaleTimeString()}
    </div>
  </div>
)

export default RecentTradesRow
