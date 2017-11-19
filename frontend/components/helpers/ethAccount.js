import { web3 } from 'libs'

const createEthAccount = (password, callback) => {
  web3.eth.personal.newAccount(password, callback)
}

const unlockAccount = (address, password, callback) => (
  web3.eth.personal.unlockAccount(address, password, callback)
)

const sendTransaction = transactionObject => (
  web3.eth.sendTransaction(transactionObject, (err, hash) => {
    console.log('err sendTransaction', err)
    console.log('hash sendTransaction', hash)
  })
)

const getTransaction = txHash => (web3.eth.getTransaction(txHash))

export { createEthAccount, unlockAccount, sendTransaction, getTransaction }
