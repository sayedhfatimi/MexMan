import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps'
import { cn } from '@/lib/utils'
import React from 'react'
import GridComponentTitleBar from './GridComponentTitleBar'

const DepthChart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
  return (
    <div
      style={{ ...style }}
      className={cn('font-mono text-xs', className)}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      {...props}
    >
      {children}
      <GridComponentTitleBar item={props['data-grid']} />
    </div>
  )
})

DepthChart.displayName = 'DepthChart'

export default DepthChart
