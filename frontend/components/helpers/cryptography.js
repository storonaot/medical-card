import forge from 'node-forge'

const Kdf1 = forge.kem.kdf1

const generateKeyPair = () => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 })
  const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey)
  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey)

  return {
    publicKey: publicKeyPem,
    privateKey: privateKeyPem
  }
}

const generateSectetKey = (publicKey) => {
  const kdf1 = new Kdf1(forge.md.sha1.create())
  const kem = forge.kem.rsa.create(kdf1)
  return kem.encrypt(publicKey, 16)
}

const encryptData = (publicKeyPEM, data) => {
  const dataStr = JSON.stringify(data)
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPEM)
  const result = generateSectetKey(publicKey)
  const iv = forge.random.getBytesSync(12)
  const cipher = forge.cipher.createCipher(
    'AES-GCM',
    result.key
  )
  cipher.start({ iv })
  cipher.update(forge.util.createBuffer(dataStr))
  cipher.finish()
  const encrypted = cipher.output.getBytes()
  const tag = cipher.mode.tag.getBytes()
  const { encapsulation } = result
  return JSON.stringify({ encrypted, iv, tag, encapsulation })
}

const decryptEncapsulated = (privateKey, encapsulation) => {
  const kdf1 = new Kdf1(forge.md.sha1.create())
  const kem = forge.kem.rsa.create(kdf1)
  return kem.decrypt(privateKey, encapsulation, 16)
}

const decryptData = (privateKeyPEM, encObjStr) => {
  const encObj = JSON.parse(encObjStr)
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM)
  const { encapsulation, iv, tag, encrypted } = encObj
  const key = decryptEncapsulated(privateKey, encapsulation)
  const decipher = forge.cipher.createDecipher('AES-GCM', key)
  decipher.start({ iv, tag })
  decipher.update(forge.util.createBuffer(encrypted))
  const pass = decipher.finish()
  if (pass) return decipher.output.getBytes()
  return 'Fuck'
}

export { decryptData, encryptData, generateKeyPair }
