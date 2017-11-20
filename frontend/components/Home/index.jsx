// import forge from 'node-forge'

// const Kdf1 = forge.kem.kdf1
//
// const generateSectetKey = (publicKey) => {
//   const kdf1 = new Kdf1(forge.md.sha1.create())
//   const kem = forge.kem.rsa.create(kdf1)
//   const result = kem.encrypt(publicKey, 16)
//   return result
// }
//
// const encryptData = (publicKey, dataStr) => {
//   const result = generateSectetKey(publicKey)
//   const iv = forge.random.getBytesSync(12)
//   const cipher = forge.cipher.createCipher(
//     'AES-GCM',
//     result.key
//   )
//   cipher.start({ iv })
//   cipher.update(forge.util.createBuffer(dataStr))
//   cipher.finish()
//   const encrypted = cipher.output.getBytes()
//   const tag = cipher.mode.tag.getBytes()
//   const { encapsulation } = result
//   return { encrypted, iv, tag, encapsulation }
// }
//
// const decryptEncapsulated = (privateKey, encapsulation) => {
//   const kdf1 = new Kdf1(forge.md.sha1.create())
//   const kem = forge.kem.rsa.create(kdf1)
//   const key = kem.decrypt(privateKey, encapsulation, 16)
//   return key
// }
//
// const decryptData = (privateKey, encObj) => {
//   const { encapsulation, iv, tag, encrypted } = encObj
//   const key = decryptEncapsulated(privateKey, encapsulation)
//   const decipher = forge.cipher.createDecipher('AES-GCM', key)
//   decipher.start({ iv, tag })
//   decipher.update(forge.util.createBuffer(encrypted))
//   const pass = decipher.finish()
//   if (pass) return decipher.output.getBytes()
//   return 'Fuck'
// }
//
// const keyPairLS = localStorage.getItem('keypair2')
// const keyPairSerialised = JSON.parse(keyPairLS)
// const publicKey = forge.pki.publicKeyFromPem(keyPairSerialised.publicKey)
// const privateKey = forge.pki.privateKeyFromPem(keyPairSerialised.privateKey)
//
// const encObj = encryptData(publicKey, 'Hello Js')
// console.log('encObj', encObj)
// const decrypt = decryptData(privateKey, encObj)
// console.log('decrypt', decrypt)

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <div>Home</div>
  }
}

export default Home
