import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import { useVault } from '@/lib/vault'
import type React from 'react'
import type { Layout } from 'react-grid-layout'
import { LuX } from 'react-icons/lu'

const GridComponentTitleBar = ({
  item,
  children
}: {
  item: Layout
  children?: React.ReactNode
}): JSX.Element => {
  const ticker = useVault((state) => state.terminal.ticker)
  const removeComponent = useVault((state) => state.removeComponent)

  return (
    <div className="drag group flex w-full cursor-move items-center justify-between border-b bg-secondary px-1 text-muted-foreground backdrop-blur-sm hover:bg-background">
      {children || <span>{`${item.i}: ${ticker}`}</span>}
      <LuX
        className="no-drag cursor-pointer transition-transform group-hover:scale-125 hover:bg-background dark:hover:bg-slate-700"
        size={ICON_SIZE_SMALL}
        onClick={() => removeComponent(item)}
      />
    </div>
  )
}

export default GridComponentTitleBar
