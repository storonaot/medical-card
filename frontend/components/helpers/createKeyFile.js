import path from 'path'

const electron = window.require('electron')
const fs = electron.remote.require('fs')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
console.log('userDataPath', userDataPath)

const createKeyFile = (userId, fileContent, callback) => {
  const filepath = path.join(userDataPath, `keys_${userId}.txt`)
  fs.writeFile(filepath, fileContent, callback)
}

const readFile = (userId, callback) => {
  const filepath = path.join(userDataPath, `keys_${userId}.txt`)
  fs.readFile(filepath, callback)
}

export { createKeyFile, readFile }
