import { readFile, decryptData } from 'helpers'

const decryptMedicalCard = (records, doctorId, callback) => {
  readFile(doctorId, (err, result) => {
    const privateKey = JSON.parse(result.toString('utf8')).privateKey
    const decryptedRecords = []
    records.forEach((record) => {
      const decrypted = decryptData(privateKey, record)
      decryptedRecords.push(JSON.parse(decrypted))
    })
    return callback(null, decryptedRecords)
  })
}

export default decryptMedicalCard
