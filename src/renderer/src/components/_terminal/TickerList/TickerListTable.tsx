import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { InstrumentMap } from '@/lib/consts/terminal/bitmex'
import { useVault } from '@/lib/vault'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import classNames from 'classnames'
import { useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

interface TickerListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TickerListTable<TData, TValue>({
  columns,
  data
}: TickerListTableProps<TData, TValue>): JSX.Element {
  const ticker = useVault((state) => state.terminal.ticker)
  const setTicker = useVault((state) => state.setTicker)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'turnover24h',
      desc: true
    }
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    typ: false
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <div className="flex h-[600px] flex-col space-y-2 font-mono">
      <div className="relative mt-2 flex items-center px-2">
        <Label
          htmlFor="search"
          className="pointer-events-none absolute left-4 text-muted-foreground"
        >
          <LuSearch />
        </Label>
        <Input
          id="search"
          placeholder="Search ticker..."
          value={(table.getColumn('symbol')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('symbol')?.setFilterValue(event.target.value)}
          className="px-8"
        />
        <Button
          variant="link"
          size="icon"
          className="group absolute right-2"
          onClick={() => table.getColumn('symbol')?.setFilterValue('')}
        >
          <LuX className="transition-transform group-hover:scale-125" />
        </Button>
      </div>
      <Separator />
      <div className="flex flex-row items-center px-2">
        <div className="flex flex-row items-center space-x-4">
          <div className="text-xs">Filter Options:</div>
          <div className="flex flex-col">
            <div className="p-2 text-xs">Contract Type</div>
            <div className="flex flex-row items-center space-x-2">
              {Object.keys(InstrumentMap).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    (table.getColumn('typ')?.getFilterValue() as string) === key
                      ? table.getColumn('typ')?.setFilterValue('')
                      : table.getColumn('typ')?.setFilterValue(key)
                  }
                  className={classNames({
                    'font-bold': true,
                    'bg-secondary-foreground text-white dark:bg-muted':
                      (table.getColumn('typ')?.getFilterValue() as string) === key
                  })}
                >
                  {InstrumentMap[key]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-y-scroll">
        <table className="relative w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="sticky top-0 z-50 bg-slate-500 p-2 dark:bg-secondary"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={classNames({
                    'group cursor-pointer transition-colors hover:bg-secondary': true,
                    'bg-secondary-foreground/20': row.getValue('symbol') === ticker
                  })}
                  onClick={() => setTicker(row.getValue('symbol'))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
