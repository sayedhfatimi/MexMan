import Spinner from '@/components/Spinner'
import { TABLE_NAME_INSTRUMENT } from '@/lib/consts/terminal/bitmex'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn, numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import React from 'react'
import GridComponentTitleBar from './GridComponentTitleBar'

const FUNDING_THRESHOLD_SAFE = 0.0002
const FUNDING_THRESHOLD_CAUTION = 0.0002
const FUNDING_THRESHOLD_DANGER = 0.0003

const ContractInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
  const ticker = useVault((state) => state.terminal.ticker)
  const data: TInstrument[] =
    useVault((state) => state?.data_public?.[TABLE_NAME_INSTRUMENT]?.[ticker]) || []

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
      <div className="group flex h-full items-center justify-evenly">
        <div className="flex flex-row space-x-2 group-hover:hidden">
          <div className="flex w-[96px] flex-col text-right">
            <div>Mark Price</div>
            <div>Funding</div>
            <div>O. Interest</div>
            <div>24h Volume</div>
          </div>
          <div className="flex flex-col">
            <div>{`${numberParser(data[0].markPrice)} ${data[0].quoteCurrency}`}</div>
            <div
              className={classNames({
                'text-red-800': data[0].fundingRate > FUNDING_THRESHOLD_DANGER,
                'text-red-600': data[0].fundingRate > FUNDING_THRESHOLD_CAUTION,
                'text-green-600': data[0].fundingRate < FUNDING_THRESHOLD_SAFE
              })}
            >
              {`${(data[0].fundingRate * 100).toFixed(4)}%`}
            </div>
            <div>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
              }).format(data[0].openInterest)}
            </div>
            <div>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
              }).format(data[0].volume24h)}
            </div>
          </div>
        </div>
        <div className="hidden flex-row space-x-2 group-hover:flex">
          <div className="flex w-[96px] flex-col text-right">
            <div>Index Price</div>
            <div>P. Funding</div>
            <div>O. Value</div>
            <div>24h Turnover</div>
          </div>
          <div className="flex flex-col">
            <div>{`${numberParser(data[0].indicativeSettlePrice)} ${data[0].quoteCurrency}`}</div>
            <div
              className={classNames({
                'text-red-800': data[0].fundingRate > FUNDING_THRESHOLD_DANGER,
                'text-red-600': data[0].fundingRate > FUNDING_THRESHOLD_CAUTION,
                'text-green-600': data[0].fundingRate < FUNDING_THRESHOLD_SAFE
              })}
            >{`${(data[0].indicativeFundingRate * 100).toFixed(4)}%`}</div>
            <div>{`${numberParser(data[0].openValue / 10 ** 8)} ${data[0].rootSymbol}`}</div>
            <div>{`${numberParser(data[0].turnover24h / 10 ** 8)} ${data[0].rootSymbol}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

ContractInfo.displayName = 'ContractInfo'

export default ContractInfo
