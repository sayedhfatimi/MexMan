import { useVault } from '@/lib/vault'
import OrdersRows from './OrdersRows'

const Orders = (): JSX.Element => {
  const APIKeys = useVault((state) => state.APIKeys)

  return (
    <table className="table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left">Account</th>
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
        {APIKeys.map((api) => (
          <OrdersRows key={api.id} APIKey={api} />
        ))}
      </tbody>
    </table>
  )
}

export default Orders
