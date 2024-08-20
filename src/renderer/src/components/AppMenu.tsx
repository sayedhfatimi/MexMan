import { FaRegWindowMinimize } from 'react-icons/fa'
import { FaRegWindowRestore } from 'react-icons/fa6'
import { LuX } from 'react-icons/lu'

const AppMenu = (): JSX.Element => {
  return (
    <div className="titlebar top-0 flex h-8 w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-1 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="logo size-6" />
        <span>MexMan</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => window.electron.ipcRenderer.invoke('MinimizeApp')}>
          <FaRegWindowMinimize className="size-3" />
        </button>
        <button onClick={() => window.electron.ipcRenderer.invoke('ToggleMaximizeApp')}>
          <FaRegWindowRestore className="size-3" />
        </button>
        <button
          onClick={() => window.electron.ipcRenderer.invoke('CloseApp')}
          className="!text-red-500 hover:!text-secondary"
        >
          <LuX />
        </button>
      </div>
    </div>
  )
}

export default AppMenu
