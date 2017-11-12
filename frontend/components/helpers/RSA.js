import { pki } from 'node-forge'

const generateRSAKeyPair = () => {
  const keyPair = pki.rsa.generateKeyPair({ bits: 256, e: 0x10001 })
  const publicKeyPem = pki.publicKeyToPem(keyPair.publicKey)
  const privateKeyPem = pki.privateKeyToPem(keyPair.privateKey)

  const rsaKeys = {
    publicKey: publicKeyPem,
    privateKey: privateKeyPem
  }

  return rsaKeys
}

const encrypt = () => {}

const decrypt = () => {}

export { decrypt, encrypt, generateRSAKeyPair }
