import { symbolSignificantFiguresMap } from '@/lib/consts/terminal/bitmex'
import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import type { TWallet } from '@/lib/types/bitmex/TWallet'
import { LuChevronDown } from 'react-icons/lu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible'

const WalletAccount = ({ data }: { data: TWallet[] }): JSX.Element => {
  return (
    <>
      {data.map((asset) => (
        <Collapsible key={asset.currency}>
          <CollapsibleTrigger asChild>
            <div className="group flex w-full flex-row items-center justify-between px-1 py-2 transition-colors hover:bg-secondary">
              <div className="flex flex-row items-center space-x-2 px-2">
                <img
                  src={`./images/cryptoIcons/${asset.currency.toLowerCase()}.svg`}
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
  )
}

export default WalletAccount
