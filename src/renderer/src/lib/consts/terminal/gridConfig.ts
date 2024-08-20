import type { Layout } from 'react-grid-layout'
import { Chart } from './Layouts/Chart'
import { ContractInfo } from './Layouts/ContractInfo'
import { DepthChart } from './Layouts/DepthChart'
import { LastPrice } from './Layouts/LastPrice'
import { OrderForm } from './Layouts/OrderForm'
import { Orderbook } from './Layouts/Orderbook'
import { PositionsOrders } from './Layouts/PositionsOrders'
import { RecentTrades } from './Layouts/RecentTrades'

export const GRID_ROW_HEIGHT = 48
export const GRID_COMPONENT_MARGIN = 4
export const GRID_COLS = { md: 48 }
export const GRID_BREAKPOINTS = { md: 996 }
export const GRID_BREAK_W = 11

export const gridProps: ReactGridLayout.ResponsiveProps & ReactGridLayout.WidthProviderProps = {
  className: 'layout',
  draggableCancel: '.no-drag',
  draggableHandle: '.drag',
  useCSSTransforms: true,
  rowHeight: GRID_ROW_HEIGHT,
  margin: [GRID_COMPONENT_MARGIN, GRID_COMPONENT_MARGIN],
  transformScale: 1,
  resizeHandles: ['se'],
  breakpoints: GRID_BREAKPOINTS,
  cols: GRID_COLS,
  isResizable: true,
  isDraggable: true,
  preventCollision: true,
  compactType: null
}

export const defaultLayout: Layout[] = [
  OrderForm,
  DepthChart,
  Chart,
  Orderbook,
  RecentTrades,
  PositionsOrders,
  ContractInfo,
  LastPrice
]
