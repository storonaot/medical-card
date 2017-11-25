import { readFile, decryptData } from 'helpers'

const decryptMedicalCard = (dataStr, doctorId, callback) => {
  readFile(doctorId, (err, result) => {
    const privateKey = JSON.parse(result.toString('utf8')).privateKey
    const decryptedMedCard = decryptData(privateKey, dataStr)
    return callback(null, JSON.parse(decryptedMedCard))
  })
}

export default decryptMedicalCard
