import { GridProps } from '@/lib/consts/terminal/gridConfig'
import { useVault } from '@/lib/vault'
import { useMemo } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Chart from './Chart'
import ContractInfo from './ContractInfo'
import DepthChart from './DepthChart'
import LastPrice from './LastPrice'
import OrderForm from './OrderForm'
import Orderbook from './Orderbook'
import PositionsOrders from './PositionsOrders'
import RecentTrades from './RecentTrades'

const GridLayout = (): JSX.Element => {
  const terminalLayout = useVault.use.terminal().activeComponents
  const setTerminalLayout = useVault.use.setTerminalLayout()

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), [])

  const gridChildren = useMemo(() => {
    const terminalComponents = [
      { label: 'Chart', node: Chart },
      { label: 'Orderbook', node: Orderbook },
      { label: 'Order Form', node: OrderForm },
      { label: 'Recent Trades', node: RecentTrades },
      { label: 'Positions & Orders', node: PositionsOrders },
      { label: 'Contract Information', node: ContractInfo },
      { label: 'Last Price', node: LastPrice },
      { label: 'Depth Chart', node: DepthChart }
    ]

    return terminalLayout.map((gridItem) =>
      terminalComponents
        .filter((component) => component.label === gridItem.i)
        .map((component) => (
          <component.node
            key={gridItem.i}
            className="flex select-none flex-col overflow-clip border bg-white shadow-md dark:bg-slate-900"
            data-grid={gridItem}
          />
        ))
    )
  }, [terminalLayout])

  return (
    <>
      <ResponsiveGridLayout
        layouts={{
          md: terminalLayout
        }}
        onLayoutChange={(layout) => {
          setTerminalLayout(layout)
        }}
        onResize={(layout) => {
          setTerminalLayout(layout)
        }}
        {...GridProps}
      >
        {gridChildren}
      </ResponsiveGridLayout>
    </>
  )
}

export default GridLayout
