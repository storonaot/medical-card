const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // const mainSession = mainWindow.webContents.session
  const { session } = mainWindow.webContents

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './public/bundles/index.html'),
    protocol: 'file:',
    slashes: true
  })
  mainWindow.loadURL(startUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
    session.clearStorageData()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('ready', () => {
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log('An error occurred: ', err))
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log('An error occurred: ', err))
})
