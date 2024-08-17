import { Button } from '@/components/ui/button'
import { TABLE_NAME_ORDER } from '@/lib/consts/terminal/bitmex'
import type { TOrder } from '@/lib/types/bitmex/TOrder'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'

const Orders = (): JSX.Element => {
  const data: TOrder[] = useVault((state) => state?._data?.[TABLE_NAME_ORDER]?.['*']) || []

  const filteredData = data
    .filter((order) => order.ordStatus !== 'Canceled')
    .filter((order) => order.ordStatus !== 'Rejected')

  return (
    <table className="table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left">Ticker</th>
          <th className="text-right">Size</th>
          <th className="text-right">Price</th>
          <th className="text-right">Remaining</th>
          <th className="text-right">Fill Price</th>
          <th className="text-right">Type</th>
          <th className="text-right">Status</th>
          <th className="text-right">Time</th>
          <th className="text-right">Action</th>
        </tr>
      </thead>
      <tbody className="box-border">
        {!filteredData || filteredData.length === 0 ? (
          <tr>
            <td>No data</td>
          </tr>
        ) : (
          <>
            {filteredData.map((order) => (
              <tr key={order.orderID} className="h-4 leading-none hover:bg-secondary">
                <td className="text-left">
                  <div
                    className={classNames({
                      'inline-flex h-4 w-1 items-center': true,
                      'bg-green-600': order.side === 'Buy',
                      'bg-red-600': order.side === 'Sell'
                    })}
                  >
                    <span className="pl-2">{order.symbol}</span>
                  </div>
                </td>
                <td className="text-right">{order.orderQty.toLocaleString()}</td>
                <td className="text-right">{order.price.toLocaleString()}</td>
                <td className="text-right">{order.leavesQty.toLocaleString()}</td>
                <td className="text-right">{order.avgPx}</td>
                <td className="text-right">{order.ordType}</td>
                <td className="text-right">{order.ordStatus}</td>
                <td className="text-right">{new Date(order.timestamp).toLocaleTimeString()}</td>
                <td className="text-right">
                  <form>
                    <input type="hidden" value={order.orderID} name="orderID" />
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

export default Orders