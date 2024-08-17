import ContentWrapper from '@/components/ContentWrapper'
import KBShortcutLabel from '@/components/KBShortcutLabel'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ICON_SIZE_LARGE, ICON_SIZE_SMALL, KB_SHORTCUT_APIKEYS_SETTINGS } from '@/lib/consts/UI'
import useKBShortcut from '@/lib/hooks/useKBShortcuts'
import { LuEye, LuEyeOff, LuKeyRound } from 'react-icons/lu'
import ApiKeysTable from './ApiKeysTable'
import ApiKeysForm from './ApiKeysForm'
import { useState } from 'react'

const ApiKeys = (): JSX.Element => {
  const [show, setShow] = useState(false)
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_APIKEYS_SETTINGS)

  return (
    <Popover onOpenChange={setOpen} open={open} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" className="group space-x-2" size="sm">
          <LuKeyRound
            size={ICON_SIZE_SMALL}
            className="transition-transform group-hover:scale-125"
          />
          <KBShortcutLabel char={KB_SHORTCUT_APIKEYS_SETTINGS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[900px] select-none space-y-2 text-pretty font-mono">
        <div className="flex items-center justify-between">
          <header className="group flex flex-row items-center space-x-4">
            <LuKeyRound
              size={ICON_SIZE_LARGE}
              className="transition-transform group-hover:scale-125"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">API Keys</h1>
              <span className="text-xs text-muted-foreground">Manage Your API Keys</span>
            </div>
          </header>

          <aside className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShow(!show)}>
              {show ? <LuEyeOff /> : <LuEye />}
            </Button>
            <ApiKeysForm />
          </aside>
        </div>

        <Separator />

        <ContentWrapper className="shadow-sm">
          <ApiKeysTable show={show} />
        </ContentWrapper>
      </PopoverContent>
    </Popover>
  )
}

export default ApiKeys
