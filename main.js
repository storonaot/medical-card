const electron = require('electron')
const { app, BrowserWindow, session } = electron

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL('http://localhost:8080')
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  const ses = session.fromPartition('persist:name')
  console.log('g', ses.getUserAgent())
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
