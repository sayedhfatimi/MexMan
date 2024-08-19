import APIKeysDeleteButton from '@/components/_apikeys/_actions/APIKeysDeleteButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import type { ColumnDef } from '@tanstack/react-table'
import { LuChevronDown, LuChevronUp, LuMoreVertical } from 'react-icons/lu'

export const APIKeysColumns: ColumnDef<TAPIKey>[] = [
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <Button
        variant="link"
        size="sm"
        className="flex flex-row items-center justify-start space-x-2 p-0 text-left font-bold text-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Label</span>
        {column.getIsSorted() === 'asc' && <LuChevronUp />}
        {column.getIsSorted() === 'desc' && <LuChevronDown />}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        <Badge>{row.getValue('label')}</Badge>
      </div>
    )
  },
  {
    accessorKey: 'id',
    header: () => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 font-bold text-white"
      >
        Account ID
      </Button>
    ),
    cell: ({ row }) => <div className="text-right text-sm">{row.getValue('id')}</div>
  },
  {
    accessorKey: 'key',
    header: () => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 font-bold text-white"
      >
        API Key
      </Button>
    ),
    cell: ({ row }) => <div className="text-right text-sm">{row.getValue('key')}</div>
  },
  {
    id: 'action',
    header: () => (
      <Button
        variant="link"
        size="sm"
        className="inline-flex w-full flex-row items-center justify-end space-x-2 p-0 font-bold text-white"
      >
        <LuMoreVertical />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-right">
        <APIKeysDeleteButton APIKeyObj={row.original} />
      </div>
    )
  }
]
