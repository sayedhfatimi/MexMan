import ApiKeys from './_apikeys/ApiKeys'
import TerminalSettings from './_terminal/TerminalSettings'
import TickerList from './_terminal/TickerList'
import TickerStrip from './_terminal/TickerStrip'
import Wallet from './_terminal/Wallet'
import { ThemeToggle } from './ThemeToggle'

const AppTray = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 flex h-[48px] w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm transition-colors hover:bg-secondary/60">
      <div className="logo mr-2 hover:animate-spin hover:ease-in-out" />
      <div className="flex flex-row items-center space-x-2">
        <TickerList />
        <TickerStrip />
      </div>
      <div className="flex grow flex-row items-center justify-end space-x-2">
        <Wallet />
        <TerminalSettings />
        <ApiKeys />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default AppTray
