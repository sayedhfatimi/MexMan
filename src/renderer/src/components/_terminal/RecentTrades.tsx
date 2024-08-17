import Spinner from '@/components/Spinner'
import { Label } from '@/components/ui/label'
import { TABLE_NAME_RECENTTRADES } from '@/lib/consts/terminal/bitmex'
import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades'
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn, numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import React from 'react'
import { LuArrowUpDown, LuClock } from 'react-icons/lu'
import { TiArrowDown, TiArrowUp } from 'react-icons/ti'
import GridComponentTitleBar from './GridComponentTitleBar'

const RecentTrades = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
  const ticker = useVault.use.terminal().ticker
  const data: TRecentTrades[] =
    useVault((state) => state?.data_public?.[TABLE_NAME_RECENTTRADES]?.[ticker]) || []

  const visibleTrades = useVault.use.terminal().visibleTrades
  const setVisibleTrades = useVault.use.setVisibleTrades()

  if (!data || data.length === 0)
    return (
      <div
        style={{ ...style }}
        className={cn('font-mono text-xs', className)}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {children}
        <GridComponentTitleBar item={props['data-grid']} />
        <div className="h-full place-content-center place-items-center text-center">
          <Spinner />
        </div>
      </div>
    )

  const filteredData = data.toReversed().slice(0, visibleTrades)

  return (
    <div
      style={{ ...style }}
      className={cn('font-mono text-xs', className)}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      {...props}
    >
      {children}
      <GridComponentTitleBar item={props['data-grid']}>
        <Header>
          <div className="no-drag z-50 flex items-center space-x-1">
            <Label htmlFor="visibleTrades" className="text-xs">
              Show:
            </Label>
            <select
              name="visibleTrades"
              id="visibleTrades"
              value={visibleTrades}
              onChange={(e) => setVisibleTrades(parseInt(e.currentTarget.value))}
              className="cursor-pointer rounded-none border-0 bg-primary-foreground"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
        </Header>
      </GridComponentTitleBar>
      <div className="snap-y overflow-y-auto">
        {filteredData.map((trade) => (
          <Row key={trade.trdMatchID} trade={trade} className="snap-start" />
        ))}
      </div>
    </div>
  )
})

const Header = ({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}): JSX.Element => (
  <div className={cn('grid w-full grid-cols-8 items-center text-slate-600', className)}>
    <div className="flex">{children || `Side`}</div>
    <div className="col-span-2 flex justify-end">Size</div>
    <div className="col-span-3 flex flex-row items-center justify-end space-x-2">
      <span>Price</span>
      <LuArrowUpDown />
    </div>
    <div className="col-span-2 flex justify-end">
      <LuClock />
    </div>
  </div>
)

const Row = ({ trade, className }: { trade: TRecentTrades; className?: string }): JSX.Element => (
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

RecentTrades.displayName = 'RecentTrades'

export default RecentTrades
