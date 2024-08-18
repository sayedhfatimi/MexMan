import { cn } from '@/lib/utils'
import { LuArrowUpDown, LuClock } from 'react-icons/lu'

const RecentTradesHeader = ({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}): JSX.Element => (
  <div className={cn('grid w-full grid-cols-8 items-center text-slate-600', className)}>
    <div className="flex">{children || `Side`}</div>
    <div className="col-span-2 flex justify-end">Size</div>
    <div className="col-span-3 flex flex-row items-center justify-end space-x-2">
      <span>Price</span>
      <LuArrowUpDown />
    </div>
    <div className="col-span-2 flex justify-end">
      <LuClock />
    </div>
  </div>
)

export default RecentTradesHeader
