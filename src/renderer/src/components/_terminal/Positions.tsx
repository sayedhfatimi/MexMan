import { Button } from '@/components/ui/button'
import { TABLE_NAME_POSITION } from '@/lib/consts/terminal/bitmex'
import type { TPosition } from '@/lib/types/bitmex/TPosition'
import { numberParser } from '@/lib/utils'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'

const Positions = (): JSX.Element => {
  const data: TPosition[] = useVault((state) => state?._data?.[TABLE_NAME_POSITION]?.['*']) || []

  const filteredData = data
    .filter((position) => position.isOpen)
    .filter((position) => position.liquidationPrice)

  return (
    <table className="table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left">Ticker</th>
          <th className="text-right">Size</th>
          <th className="text-right">Value</th>
          <th className="text-right">Entry</th>
          <th className="text-right">Mark</th>
          <th className="text-right text-red-600">Liquidation</th>
          <th className="text-right">Margin</th>
          <th className="text-right">Leverage</th>
          <th className="text-right">Position PnL</th>
          <th className="text-right">ROE %</th>
          <th className="text-right">Unrealised PnL</th>
          <th className="text-right">Realised PnL</th>
          <th className="text-right">Close</th>
        </tr>
      </thead>
      <tbody className="box-border">
        {!filteredData || filteredData.length === 0 ? (
          <tr>
            <td>No data</td>
          </tr>
        ) : (
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
                    <span className="pl-2">{position.symbol}</span>
                  </div>
                </td>
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
                <td className="text-right">
                  {position.crossMargin ? 'Cross' : `${position.leverage}x`}
                </td>
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
                    <Button
                      variant="outline"
                      size="sm"
                      type="submit"
                      className="h-6 rounded-none px-1"
                    >
                      Cancel
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  )
}

export default Positions