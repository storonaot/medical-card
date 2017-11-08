import path from 'path'

const electron = window.require('electron')
const fs = electron.remote.require('fs')

const createKeyFile = (userId, fileContent, callback) => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  console.log('userDataPath', userDataPath)
  const filepath = path.join(userDataPath, `keys_${userId}.txt`)
  fs.writeFile(filepath, fileContent, callback)
}

export default createKeyFile
