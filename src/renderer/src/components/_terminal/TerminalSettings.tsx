import ConnectionStatus from '@/components/ConnectionStatus'
import ContentWrapper from '@/components/ContentWrapper'
import KBShortcutLabel from '@/components/KBShortcutLabel'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  componentIconMap,
  ICON_SIZE_LARGE,
  ICON_SIZE_SMALL,
  KB_SHORTCUT_TERMINAL_SETTINGS
} from '@/lib/consts/UI'
import { defaultLayout } from '@/lib/consts/terminal/gridConfig'
import useKBShortcut from '@/lib/hooks/useKBShortcuts'
import { useVault } from '@/lib/vault'
import { LuEye, LuEyeOff, LuSettings } from 'react-icons/lu'
import { MdLockReset } from 'react-icons/md'

const TerminalSettings = (): JSX.Element => {
  const resetLayout = useVault((state) => state.resetLayout)
  const ticker = useVault((state) => state.terminal.ticker)
  const activeComponents = useVault((state) => state.terminal.activeComponents)
  const inactiveComponents = useVault((state) => state.terminal.inactiveComponents)
  const addComponent = useVault((state) => state.addComponent)
  const removeComponent = useVault((state) => state.removeComponent)
  const componentState = useVault((state) => state.terminal.componentState)
  const toggleComponentState = useVault((state) => state.toggleComponentState)

  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_TERMINAL_SETTINGS)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" className="group space-x-2" size="sm">
          <LuSettings
            size={ICON_SIZE_SMALL}
            className="transition-transform group-hover:scale-125"
          />
          <KBShortcutLabel char={KB_SHORTCUT_TERMINAL_SETTINGS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] select-none text-sm">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <header className="group flex flex-row items-center space-x-4">
              <LuSettings size={ICON_SIZE_LARGE} className="group-hover:animate-spin" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Terminal Settings</h1>
                <span className="text-xs text-muted-foreground">Customize Your Terminal</span>
              </div>
            </header>
            <Button
              variant="outline"
              size="sm"
              className="group space-x-2"
              onClick={() => resetLayout()}
            >
              <MdLockReset
                size={ICON_SIZE_SMALL}
                className="transition-transform group-hover:scale-125"
              />
              <span>Reset Layout</span>
            </Button>
          </div>
          <Separator />
          <ContentWrapper className="space-y-2 shadow-sm">
            <div className="flex flex-row items-center justify-between border p-2">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Ticker</span>
                  <span>{ticker}</span>
                </div>
              </div>
              <ConnectionStatus />
            </div>
            {defaultLayout.map((component) => (
              <div
                key={component.i}
                className="group flex flex-row items-center justify-between px-2 py-2 transition-colors hover:bg-secondary"
              >
                <Label htmlFor={component.i} className="flex items-center space-x-4 px-2">
                  <img
                    src={`./images/terminalSettingsIcons/${componentIconMap[component.i]}`}
                    className="transition-transform group-hover:scale-125"
                  />
                  <span>{component.i}</span>
                </Label>
                <div className="flex flex-row items-center space-x-4">
                  <LuEyeOff size={ICON_SIZE_SMALL} />
                  <Switch
                    id={component.i}
                    checked={componentState[component.i]}
                    onCheckedChange={() => {
                      if (activeComponents.some((o) => o.i === component.i)) {
                        removeComponent(activeComponents.find((o) => o.i === component.i)!)
                        toggleComponentState(component.i)
                      } else {
                        addComponent(inactiveComponents.find((o) => o.i === component.i)!)
                        toggleComponentState(component.i)
                      }
                    }}
                  />
                  <LuEye size={ICON_SIZE_SMALL} />
                </div>
              </div>
            ))}
          </ContentWrapper>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TerminalSettings
