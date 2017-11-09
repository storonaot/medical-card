import { web3 } from 'libs'

const createEthAccount = () => {
  const account = web3.eth.accounts.create()
  const data = {
    address: account.address,
    privateKey: account.privateKey
  }
  return data
}

export default createEthAccount
