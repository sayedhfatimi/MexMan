import GridLayout from '@/components/_terminal/GridLayout'
import WebsocketConnector from '@/components/_terminal/WebsocketConnector'
import AppTray from '@/components/AppTray'
import ContentWrapper from '@/components/ContentWrapper'
import AppMenu from './components/AppMenu'

const App = (): JSX.Element => {
  return (
    <>
      <AppMenu />
      <ContentWrapper className="h-full">
        <WebsocketConnector />
        <GridLayout />
      </ContentWrapper>
      <AppTray />
    </>
  )
}

export default App
