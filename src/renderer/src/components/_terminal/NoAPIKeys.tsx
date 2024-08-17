import { ICON_SIZE_LARGE } from '@/lib/consts/UI'
import { LuAlertTriangle } from 'react-icons/lu'

const NoAPIKeys = (): JSX.Element => {
  return (
    <div className="flex flex-row items-center space-x-4 px-2 py-4">
      <LuAlertTriangle size={ICON_SIZE_LARGE} />
      <div className="flex flex-col font-mono">
        <div className="text-lg">No account API keys stored</div>
        <div className="text-xs">Add an API Key via the API Key Manager in the app tray</div>
      </div>
    </div>
  )
}

export default NoAPIKeys
