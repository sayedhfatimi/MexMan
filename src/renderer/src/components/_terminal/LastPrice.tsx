import Spinner from '@/components/Spinner'
import { TABLE_NAME_INSTRUMENT } from '@/lib/consts/terminal/bitmex'
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI'
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn, numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import React from 'react'
import { LuArrowDown, LuArrowUp, LuCircle } from 'react-icons/lu'
import GridComponentTitleBar from './GridComponentTitleBar'

const LastPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
  const ticker = useVault((state) => state.terminal.ticker)
  const data = useVault((state) => state?.data_public?.[TABLE_NAME_INSTRUMENT]?.[ticker]) || []

  if (!data || data.length === 0)
    return (
      <div
        style={{ ...style }}
        className={cn('text-xs', className)}
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

  return (
    <div
      style={{ ...style }}
      className={cn('text-xs', className)}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      {...props}
    >
      {children}
      <GridComponentTitleBar item={props['data-grid']} />
      <div className="flex h-full flex-col place-content-center place-items-center p-2">
        <div className="text-muted-foreground">Last Price</div>
        <div className="flex flex-row items-center space-x-2">
          <div
            className={classNames({
              'hidden 2xl:flex': true,
              'text-green-600 dark:text-green-600': data[0].lastTickDirection === 'PlusTick',
              'text-red-600 dark:text-red-600': data[0].lastTickDirection === 'MinusTick'
            })}
          >
            {data[0].lastTickDirection === 'PlusTick' ? (
              <LuArrowUp size={ICON_SIZE_MEDIUM} />
            ) : data[0].lastTickDirection === 'MinusTick' ? (
              <LuArrowDown size={ICON_SIZE_MEDIUM} />
            ) : (
              <LuCircle size={ICON_SIZE_MEDIUM} />
            )}
          </div>
          <div
            className={classNames({
              'text-xl 2xl:text-4xl': true,
              'text-green-600 dark:text-green-600': data[0].lastTickDirection === 'PlusTick',
              'text-red-600 dark:text-red-600': data[0].lastTickDirection === 'MinusTick'
            })}
          >
            {numberParser(data[0].lastPrice)}
          </div>
        </div>
      </div>
    </div>
  )
})

LastPrice.displayName = 'LastPrice'

export default LastPrice
