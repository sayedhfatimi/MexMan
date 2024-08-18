import { TABLE_NAME_ORDER } from '@/lib/consts/terminal/bitmex'
import type { TOrder } from '@/lib/types/bitmex/TOrder'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import { useVault } from '@/lib/vault'
import classNames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'

type TCancelOrderInput = {
  orderID: TOrder['orderID']
  account: TOrder['account']
}

const OrdersRows = ({ APIKey }: { APIKey: TAPIKey }): JSX.Element => {
  const data: TOrder[] =
    useVault((state) => state?.data_private?.[TABLE_NAME_ORDER]?.[APIKey.id]) || []

  const { register, handleSubmit } = useForm<TCancelOrderInput>()

  const handleCancelOrder: SubmitHandler<TCancelOrderInput> = async (data) => {
    if (APIKey) {
      await window.electron.ipcRenderer.invoke(
        'bitmex:authRESTRequest',
        'DELETE',
        '/api/v1/order',
        APIKey.key,
        APIKey.secret,
        JSON.stringify({ orderID: data.orderID })
      )
    }
  }

  if (!data || data.length === 0) {
    return (
      <tr>
        <td>No Data</td>
      </tr>
    )
  }

  const filteredData = data
    .filter((order) => order.ordStatus !== 'Canceled')
    .filter((order) => order.ordStatus !== 'Rejected')
    .filter((order) => order.ordStatus !== 'Filled')

  if (!filteredData || filteredData.length === 0) {
    return (
      <tr>
        <td>No Data</td>
      </tr>
    )
  }

  return (
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
              <span className="pl-2">{APIKey.label}</span>
            </div>
          </td>
          <td className="text-left">{order.symbol}</td>
          <td className="text-right">{order.orderQty.toLocaleString()}</td>
          <td className="text-right">{order.price.toLocaleString()}</td>
          <td className="text-right">{order.leavesQty.toLocaleString()}</td>
          <td className="text-right">{order.avgPx}</td>
          <td className="text-right">{order.ordType}</td>
          <td className="text-right">{order.ordStatus}</td>
          <td className="text-right">{new Date(order.timestamp).toLocaleTimeString()}</td>
          <td className="text-right">
            <form onSubmit={handleSubmit(handleCancelOrder)}>
              <input type="hidden" value={order.orderID} {...register('orderID')} />
              <input type="hidden" value={order.account} {...register('account')} />
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

export default OrdersRows
