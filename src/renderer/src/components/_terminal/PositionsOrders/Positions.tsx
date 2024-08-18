import { useVault } from '@/lib/vault'
import PositionsRows from './PositionsRows'

const Positions = (): JSX.Element => {
  const APIKeys = useVault.use.APIKeys()

  return (
    <table className="table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left">Account</th>
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
        {APIKeys.map((api) => (
          <PositionsRows key={api.id} APIKey={api} />
        ))}
      </tbody>
    </table>
  )
}

export default Positions
