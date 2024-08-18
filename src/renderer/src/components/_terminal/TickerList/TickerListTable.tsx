import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useVault } from '@/lib/vault'
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
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
  const ticker = useVault.use.terminal().ticker
  const setTicker = useVault.use.setTicker()
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'turnover24h',
      desc: true
    }
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  return (
    <div className="flex h-[500px] flex-col font-mono">
      <div className="relative flex items-center px-2 py-4">
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
      <div className="flex-grow overflow-y-scroll font-mono text-sm">
        <table className="relative w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="sticky top-0 z-50 bg-slate-500 px-2 py-2 dark:bg-secondary"
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
                    <td key={cell.id} className="px-2 py-2">
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
