const electron = require('electron')
const { app, BrowserWindow, session } = electron

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  // let mainSession = mainWindow.webContents.session
  mainWindow.loadURL('http://localhost:8080')
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))


  // mainSession.cookies.get({ domain: 'medicalcard.com' }, (error, cookies) => {
  //   console.log('cookies', cookies)
  // })
  //
  // mainSession.cookies.set({
  //   url: 'https://medicalcard.com',
  //   name: 'cookie1',
  //   value: 'cookie_value',
  //   domain: 'medicalcard.com',
  //   expirationDate: 999999999999999
  // }, (error) => {
  //   console.log('Cookies set', error)
  //   mainSession.cookies.get({}, (error, cookies) => {
  //     console.log('cookies', cookies)
  //   })
  // })

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
