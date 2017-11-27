import { web3 } from 'libs'
import { getTransaction, readFile, decryptData } from 'helpers'
import async from 'async'

const getMedicalRecords = (txHashes, patientId, callback) => {
  async.parallel([
    (cb) => {
      const txsArray = []
      async.each(txHashes,
        (txHash, _cb) => {
          getTransaction(txHash, (err, tx) => {
            txsArray.push(tx)
            _cb()
          })
        },
        (err) => { cb(err, txsArray) }
      )
    },
    (cb) => {
      readFile(patientId, (err, result) => {
        cb(err, JSON.parse(result.toString('utf8')))
      })
    }
  ], (err, results) => {
    if (err) return callback(err, null)
    const txs = results[0].filter(i => i !== undefined)
    const { privateKey } = results[1]
    const records = []
    txs.forEach((tx) => {
      const decryptedRecord = decryptData(privateKey, web3.utils.hexToUtf8(tx.input))
      records.push(JSON.parse(decryptedRecord))
    })
    return callback(null, records)
  })
}

export default getMedicalRecords
