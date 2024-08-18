import { Button } from '@/components/ui/button'
import { InstrumentMap } from '@/lib/consts/terminal/bitmex'
import type { TInstrument } from '@/lib/types/bitmex/TInstrument'
import { numberParser } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'

export const TickerListColumns: ColumnDef<TInstrument>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => (
      <Button
        variant="link"
        size="sm"
        className="flex flex-row items-center space-x-2 p-0 text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Ticker</span>
        {column.getIsSorted() === 'asc' && <LuChevronUp />}
        {column.getIsSorted() === 'desc' && <LuChevronDown />}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-row items-center justify-between">
        <div className="inline-flex items-center space-x-2">
          <img
            src={`./images/cryptoIcons/${row.original.rootSymbol.toLowerCase()}.svg`}
            alt={row.getValue('symbol')}
            className="size-6 transition-transform group-hover:scale-125"
          />
          <span className="font-bold">{row.getValue('symbol')}</span>
        </div>
        <div className="flex flex-col items-end text-xs text-muted-foreground group-hover:text-black dark:group-hover:text-white">
          {InstrumentMap[row.original.typ]}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'lastPrice',
    header: ({ column }) => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {column.getIsSorted() === 'asc' && <LuChevronUp />}
        {column.getIsSorted() === 'desc' && <LuChevronDown />}
        <span className="text-right">Last Price</span>
      </Button>
    ),
    cell: ({ row }): JSX.Element => (
      <div
        className={classNames({
          'text-right': true,
          'text-green-600 dark:text-green-600':
            row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') > 0,
          'text-red-600 dark:text-red-600':
            row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') < 0
        })}
      >
        <div className="flex flex-row items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground group-hover:text-black dark:group-hover:text-white">
            {row.original.quoteCurrency}
          </span>
          <span className="font-bold">
            {numberParser(row.getValue<TInstrument['lastPrice']>('lastPrice'))}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'lastChangePcnt',
    header: ({ column }) => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {column.getIsSorted() === 'asc' && <LuChevronUp />}
        {column.getIsSorted() === 'desc' && <LuChevronDown />}
        <span className="text-right">24h Change</span>
      </Button>
    ),
    cell: ({ row }): JSX.Element => (
      <div
        className={classNames({
          'text-right font-bold': true,
          'text-green-600 dark:text-green-600':
            row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') > 0,
          'text-red-600 dark:text-red-600':
            row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') < 0
        })}
      >
        {`${row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') > 0 ? '+' : ''}${numberParser(row.getValue<TInstrument['lastChangePcnt']>('lastChangePcnt') * 100)} %`}
      </div>
    )
  },
  {
    accessorKey: 'turnover24h',
    header: ({ column }) => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {column.getIsSorted() === 'asc' && <LuChevronUp />}
        {column.getIsSorted() === 'desc' && <LuChevronDown />}
        <span className="text-right">24h Volume (USD)</span>
      </Button>
    ),
    cell: ({ row }): JSX.Element => (
      <div className="text-right font-bold">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        }).format(row.getValue('turnover24h'))}
      </div>
    )
  }
]
