import GridLayout from '@/components/_terminal/GridLayout'
import PublicWebsocket from '@/components/_terminal/PublicWebsocket'
import AppTray from '@/components/AppTray'
import ContentWrapper from '@/components/ContentWrapper'
import PrivateWebsocket from './components/_terminal/PrivateWebsocket'
import AppMenu from './components/AppMenu'

const App = (): JSX.Element => {
  return (
    <>
      <AppMenu />
      <ContentWrapper className="h-full">
        <PublicWebsocket />
        <PrivateWebsocket />
        <GridLayout />
      </ContentWrapper>
      <AppTray />
    </>
  )
}

export default App
