import GridComponentTitleBar from '@/components/_terminal/GridComponentTitleBar'
import NoAPIKeys from '@/components/_terminal/NoAPIKeys'
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import React, { useState } from 'react'
import Orders from './Orders'
import Positions from './Positions'

const PositionsOrders = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
  const APIKeys = useVault.use.APIKeys()
  const [tab, setTab] = useState('positions')

  if (APIKeys.length === 0) {
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
        <div className="mx-auto h-full place-content-center place-items-center">
          <NoAPIKeys />
        </div>
      </div>
    )
  }

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
        <div className="no-drag flex cursor-pointer flex-row space-x-2">
          <div
            onClick={() => setTab('positions')}
            className={classNames({
              'px-2 py-1 hover:bg-secondary/50': true,
              'bg-secondary-foreground text-muted hover:text-muted-foreground': tab === 'positions'
            })}
          >
            Positions
          </div>
          <div
            onClick={() => setTab('orders')}
            className={classNames({
              'px-2 py-1 hover:bg-secondary/50': true,
              'bg-secondary-foreground text-muted hover:text-muted-foreground': tab === 'orders'
            })}
          >
            Orders
          </div>
        </div>
      </GridComponentTitleBar>
      {tab === 'positions' && <Positions />}
      {tab === 'orders' && <Orders />}
    </div>
  )
})

PositionsOrders.displayName = 'PositionsOrders'

export default PositionsOrders
