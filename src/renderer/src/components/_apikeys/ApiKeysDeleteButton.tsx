import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import { useVault } from '@/lib/vault'
import { useState } from 'react'
import { LuBomb, LuTrash2 } from 'react-icons/lu'

const ApiKeysDeleteButton = ({ APIKeyObj }: { APIKeyObj: TAPIKey }): JSX.Element => {
  const [isDeleting, setDeleting] = useState(false)
  const removeKey = useVault.use.removeKey()

  const confirmDeleteApiKey = (): void => {
    setDeleting(true)
    removeKey(APIKeyObj)
    setDeleting(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="inline-flex size-6 place-content-center items-center rounded-md bg-red-600 text-white hover:bg-red-800"
          disabled={isDeleting}
        >
          <LuTrash2 size={ICON_SIZE_SMALL} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this API key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-red-800 font-bold text-white hover:bg-red-600">
            <Button onClick={confirmDeleteApiKey} className="space-x-2">
              <LuBomb size={ICON_SIZE_SMALL} />
              <span>DELETE!</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ApiKeysDeleteButton
