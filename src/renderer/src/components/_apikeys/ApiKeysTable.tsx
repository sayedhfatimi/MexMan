import NoAPIKeys from '@/components/_terminal/NoAPIKeys'
import { Badge } from '@/components/ui/badge'
import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import { useVault } from '@/lib/vault'
import { LuX } from 'react-icons/lu'
import ApiKeysDeleteButton from './ApiKeysDeleteButton'

const ApiKeysTable = ({ show }: { show: boolean }): JSX.Element => {
  const APIKeys = useVault.use.APIKeys()

  if (APIKeys.length === 0)
    return (
      <div className="mx-auto h-full place-content-center place-items-center">
        <NoAPIKeys />
      </div>
    )

  return (
    <table className="w-full table-auto font-mono">
      <thead className="border-b">
        <tr>
          <th className="px-2 py-1 text-left">Label</th>
          <th className="py-1 text-right">Account ID</th>
          <th className="py-1 text-right">API Key</th>
          <th className="py-2">
            <div className="flex justify-end px-2">
              <LuX size={ICON_SIZE_SMALL} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {APIKeys.map((api: TAPIKey) => (
          <tr key={api.id} className="hover:bg-secondary">
            <td className="px-2 py-2">
              <Badge variant="secondary">{api.label}</Badge>
            </td>
            <td className="py-2 text-right text-xs">{show ? api.id : '*'.repeat(api.id.length)}</td>
            <td className="py-2 text-right text-xs">
              {show ? api.key : '*'.repeat(api.key.length)}
            </td>
            <td className="px-2 py-2 text-right">
              <ApiKeysDeleteButton APIKeyObj={api} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ApiKeysTable
