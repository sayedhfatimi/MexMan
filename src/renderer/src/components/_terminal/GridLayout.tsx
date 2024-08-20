import { gridProps } from '@/lib/consts/terminal/gridConfig'
import { useVault } from '@/lib/vault'
import _ from 'lodash'
import { useCallback, useMemo } from 'react'
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
  const layout = useVault((state) => state.terminal.layout)
  const components = useVault((state) => state.terminal.components)
  const setLayout = useCallback(
    _.throttle(
      useVault((state) => state.setLayout),
      200
    ),
    []
  )

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

    return terminalComponents.map(
      (component) =>
        components[component.label] && (
          <component.node
            key={component.label}
            className="flex select-none flex-col overflow-clip border bg-white shadow-md dark:bg-slate-900"
            data-grid={layout.find((item) => item.i === component.label)!}
          />
        )
    )
  }, [layout, components])

  return (
    <>
      <ResponsiveGridLayout
        layouts={{
          md: layout
        }}
        onDrag={(layout) => {
          setLayout(layout)
        }}
        onResize={(layout) => {
          setLayout(layout)
        }}
        {...gridProps}
      >
        {gridChildren}
      </ResponsiveGridLayout>
    </>
  )
}

export default GridLayout
