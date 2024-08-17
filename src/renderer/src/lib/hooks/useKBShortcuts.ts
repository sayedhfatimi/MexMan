import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

const useKBShortcut = (
  key: string
): { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> } => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return (): void => document.removeEventListener('keydown', down)
  }, [key])

  return { open, setOpen }
}

export default useKBShortcut
