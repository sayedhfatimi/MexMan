import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { resolve } from 'path'
import icon from '../../resources/favicon.ico?asset'
import { restRequest } from './restRequest'
import { getAuthObj } from './getAuthObj'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    icon,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: resolve(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(resolve(__dirname, '../renderer/index.html'))
  }

  ipcMain.handle('ToggleMaximizeApp', async () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.handle('MinimizeApp', async () => {
    mainWindow.minimize()
  })
}

Menu.setApplicationMenu(null)

app.whenReady().then(() => {
  ipcMain.handle('CloseApp', async () => {
    app.quit()
  })

  ipcMain.handle(
    'bitmex:getAuth',
    (_event, verb: string, path: string, key: string, secret: string) =>
      getAuthObj(verb, path, key, secret)
  )

  ipcMain.handle(
    'bitmex:RESTRequest',
    async (_event, verb: string, path: string) => await restRequest(verb, path)
  )

  ipcMain.handle(
    'bitmex:authRESTRequest',
    async (_event, verb: string, path: string, key: string, secret: string, data?: string) => {
      const authObj = getAuthObj(verb, path, key, secret, data)

      const authHeaders = {
        'api-expires': authObj['api-expires'],
        'api-key': authObj['api-key'],
        'api-signature': authObj['api-signature']
      }

      return await restRequest(verb, path, authHeaders, data)
    }
  )

  electronApp.setAppUserModelId('com.mexman')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
