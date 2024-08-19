import ContentWrapper from '@/components/ContentWrapper'
import KBShortcutLabel from '@/components/KBShortcutLabel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { TABLE_NAME_WALLET } from '@/lib/consts/terminal/bitmex'
import { ICON_SIZE_LARGE, ICON_SIZE_SMALL, KB_SHORTCUT_WALLET } from '@/lib/consts/UI'
import useKBShortcut from '@/lib/hooks/useKBShortcuts'
import { useVault } from '@/lib/vault'
import { LuWallet } from 'react-icons/lu'
import WalletAccount from './WalletAccount'

const Wallet = (): JSX.Element | null => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_WALLET)
  const data = useVault((state) => state?.data_private?.[TABLE_NAME_WALLET])
  const APIKeys = useVault((state) => state.APIKeys)

  if (!data) return null

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" className="group space-x-2" size="sm">
          <LuWallet size={ICON_SIZE_SMALL} className="transition-transform group-hover:scale-125" />
          <KBShortcutLabel char={KB_SHORTCUT_WALLET} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] select-none font-mono text-sm">
        <div className="flex flex-col space-y-2">
          <header className="group flex flex-row items-center space-x-4">
            <LuWallet size={ICON_SIZE_LARGE} className="group-hover:animate-bounce" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Wallet</h1>
              <span className="text-xs text-muted-foreground">Wallet Balance</span>
            </div>
          </header>
          <Separator />
          <ContentWrapper className="space-y-2">
            <Accordion type="single" collapsible>
              {APIKeys.map((api) => (
                <AccordionItem key={api.id} value={api.label}>
                  <AccordionTrigger className="px-2">{api.label}</AccordionTrigger>
                  <AccordionContent>
                    <WalletAccount data={data[api.id]} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ContentWrapper>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Wallet
