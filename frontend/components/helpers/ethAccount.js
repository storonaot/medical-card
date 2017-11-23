import { web3 } from 'libs'

const createEthAccount = (password, callback) => {
  web3.eth.personal.newAccount(password, callback)
}

const unlockAccount = (address, password, callback) => (
  web3.eth.personal.unlockAccount(address, password, callback)
)

const sendTransaction = transactionObject => (
  web3.eth.sendTransaction(transactionObject)
)

// const getTransaction = txHash => (web3.eth.getTransaction(txHash))
const getTransaction = (txHash, callback) => (web3.eth.getTransaction(txHash, callback))

export { createEthAccount, unlockAccount, sendTransaction, getTransaction }
