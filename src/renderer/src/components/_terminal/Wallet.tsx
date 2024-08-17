import ContentWrapper from '@/components/ContentWrapper'
import KBShortcutLabel from '@/components/KBShortcutLabel'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { symbolSignificantFiguresMap, TABLE_NAME_WALLET } from '@/lib/consts/terminal/bitmex'
import { CryptoIconMap } from '@/lib/consts/terminal/cryptoIconMap'
import { ICON_SIZE_LARGE, ICON_SIZE_SMALL, KB_SHORTCUT_WALLET } from '@/lib/consts/UI'
import useKBShortcut from '@/lib/hooks/useKBShortcuts'
import type { TWallet } from '@/lib/types/bitmex/TWallet'
import { useVault } from '@/lib/vault'
import { LuChevronDown, LuWallet } from 'react-icons/lu'

const Wallet = (): JSX.Element | null => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_WALLET)

  const data: TWallet[] = useVault((state) => state?._data?.[TABLE_NAME_WALLET]?.['*']) || []

  if (data.length === 0) return null

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
            <>
              {data.map((asset) => (
                <Collapsible key={asset.currency}>
                  <CollapsibleTrigger asChild>
                    <div className="group flex w-full flex-row items-center justify-between px-1 py-2 transition-colors hover:bg-secondary">
                      <div className="flex flex-row items-center space-x-2 px-2">
                        <img
                          src={`./images/cryptoIcons/${CryptoIconMap[asset.currency.toLowerCase()]}`}
                          height={16}
                          width={16}
                          alt={asset.currency}
                          className="transition-transform group-hover:scale-125"
                        />
                        <span>{asset.currency}</span>
                      </div>

                      <div className="flex flex-row items-center justify-end space-x-2">
                        <span className="text-lg">
                          {(
                            asset.amount /
                            10 ** symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                          ).toFixed(8)}
                        </span>
                        <LuChevronDown
                          size={ICON_SIZE_SMALL}
                          className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    <div className="flex flex-col space-y-2 px-2 py-1">
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-xs text-muted-foreground">Available</span>
                        <span className="mr-5">
                          {(
                            asset.amount /
                            10 ** symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                          ).toFixed(8)}
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-xs text-muted-foreground">Pending Deposit</span>
                        <span className="mr-5">
                          {(
                            asset.pendingCredit /
                            10 ** symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                          ).toFixed(8)}
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-xs text-muted-foreground">Pending Withdrawal</span>
                        <span className="mr-5">
                          {(
                            asset.pendingDebit /
                            10 ** symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                          ).toFixed(8)}
                        </span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </>
          </ContentWrapper>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Wallet
