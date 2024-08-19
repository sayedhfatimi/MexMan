import GridComponentTitleBar from '@/components/_terminal/GridComponentTitleBar'
import Spinner from '@/components/Spinner'
import { Label } from '@/components/ui/label'
import { TABLE_NAME_RECENTTRADES } from '@/lib/consts/terminal/bitmex'
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades'
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import React from 'react'
import RecentTradesHeader from './RecentTradesHeader'
import RecentTradesRow from './RecentTradesRow'

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
        <RecentTradesHeader>
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
        </RecentTradesHeader>
      </GridComponentTitleBar>
      <div className="snap-y overflow-y-auto">
        {filteredData.map((trade) => (
          <RecentTradesRow key={trade.trdMatchID} trade={trade} className="snap-start" />
        ))}
      </div>
    </div>
  )
})

RecentTrades.displayName = 'RecentTrades'

export default RecentTrades
