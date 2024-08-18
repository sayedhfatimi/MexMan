import { TABLE_NAME_POSITION } from '@/lib/consts/terminal/bitmex'
import type { TPosition } from '@/lib/types/bitmex/TPosition'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import { numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import { Button } from '../../ui/button'

const PositionsRows = ({ APIKey }: { APIKey: TAPIKey }): JSX.Element => {
  const data: TPosition[] =
    useVault((state) => state?.data_private?.[TABLE_NAME_POSITION]?.[APIKey.id]) || []

  if (!data || data.length === 0) {
    return (
      <tr>
        <td>No Data</td>
      </tr>
    )
  }

  const filteredData = data
    .filter((position) => position.isOpen)
    .filter((position) => position.liquidationPrice)

  if (!filteredData || filteredData.length === 0) {
    return (
      <tr>
        <td>No Data</td>
      </tr>
    )
  }

  return (
    <>
      {filteredData.map((position) => (
        <tr
          key={position.account + position.symbol + position.currency}
          className="h-4 leading-none hover:bg-secondary"
        >
          <td className="text-left">
            <div
              className={classNames({
                'inline-flex h-4 w-1 items-center': true,
                'bg-green-600': position.homeNotional > 0,
                'bg-red-600': position.homeNotional < 0
              })}
            >
              <span className="pl-2">{APIKey.label}</span>
            </div>
          </td>
          <td className="text-left">{position.symbol}</td>
          <td
            className={classNames({
              'text-right font-bold': true,
              'text-green-600': position.homeNotional > 0,
              'text-red-600': position.homeNotional < 0
            })}
          >
            {`${position.homeNotional} ${position.underlying}`}
          </td>
          <td className="text-right">
            {`${numberParser(Math.abs(position.foreignNotional))} ${position.currency}`}
          </td>
          <td className="text-right">{numberParser(position.avgEntryPrice)}</td>
          <td className="text-right">{numberParser(position.markPrice)}</td>
          <td className="text-right font-bold text-red-600">
            {numberParser(position.liquidationPrice)}
          </td>
          <td className="text-right">
            {`${numberParser(position.posMargin / 10 ** 6)} ${position.currency}`}
          </td>
          <td className="text-right">{position.crossMargin ? 'Cross' : `${position.leverage}x`}</td>
          <td className="text-right">{position.realisedCost}</td>
          <td
            className={classNames({
              'text-right font-bold': true,
              'text-green-600': position.unrealisedRoePcnt > 0,
              'text-red-600': position.unrealisedRoePcnt < 0
            })}
          >
            {`${(position.unrealisedRoePcnt * 100).toFixed(2)} %`}
          </td>
          <td
            className={classNames({
              'text-right font-bold': true,
              'text-green-600': position.unrealisedPnl > 0,
              'text-red-600': position.unrealisedPnl < 0
            })}
          >
            {`${numberParser(position.unrealisedPnl / 10 ** 6)} (${(position.unrealisedPnlPcnt * 100).toFixed(2)}%)`}
          </td>
          <td
            className={classNames({
              'text-right font-bold': true,
              'text-green-600': position.rebalancedPnl > 0,
              'text-red-600': position.rebalancedPnl < 0
            })}
          >
            {numberParser(position.rebalancedPnl / 10 ** 6)}
          </td>
          <td className="text-right">
            <form>
              <input type="hidden" value={position.symbol} name="symbol" />
              <Button variant="outline" size="sm" type="submit" className="h-6 rounded-none px-1">
                Cancel
              </Button>
            </form>
          </td>
        </tr>
      ))}
    </>
  )
}

export default PositionsRows
