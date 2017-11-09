import bitcore from 'bitcore-lib'
import ECIES from 'bitcore-ecies'

// SCHEMA
// identity = {
//   type: 'ethereum',
//   display: '0x54dbb737eac5007103e729e9ab7ce64a6850a310',
//   privateKey: '52435b1ff11b894da15d87399011841d5edec2de4552fdc29c8299574436924d',
//   publicKey: '029678ad0aa2fbd7f212239e21ed1472e84ca558fecf70a54bbf7901d89c306191',
//   foreign: false
// }

const encrypt = (identity, message) => {
  const privKey = new bitcore.PrivateKey(identity.privateKey)
  const alice = ECIES().privateKey(privKey).publicKey(new bitcore.PublicKey(identity.publicKey))
  const encrypted = alice.encrypt(message)

  return encrypted.toString('hex')
}

const decrypt = (identity, encrypted) => {
  const privKey = new bitcore.PrivateKey(identity.privateKey)
  const alice = ECIES().privateKey(privKey)
  const decryptMe = new Buffer(encrypted, 'hex')
  const decrypted = alice.decrypt(decryptMe)

  return decrypted.toString('ascii')
}

export { encrypt, decrypt }

// var testIdentity= {
//             type: 'ethereum',
//             display: '0x54dbb737eac5007103e729e9ab7ce64a6850a310',
//             privateKey: '52435b1ff11b894da15d87399011841d5edec2de4552fdc29c8299574436924d',
//             publicKey: '029678ad0aa2fbd7f212239e21ed1472e84ca558fecf70a54bbf7901d89c306191',
//             foreign: false
//         };
// var message = "foobar";
// var bitcore = require('bitcore-lib');
// var ECIES = require('bitcore-ecies');
//
//     /**
//      * encrypt the message with the publicKey of identity
//      * @param  {{privateKey: ?string, publicKey: string}} identity
//      * @param  {string} message
//      * @return {string}
//      */
//     var encrypt = function(identity, message) {
//
//         /*
//          * this key is used as false sample, because bitcore would crash when alice has no privateKey
//          */
//         var privKey = new bitcore.PrivateKey('52435b1ff21b894da15d87399011841d5edec2de4552fdc29c8299574436925d');
//         var alice = ECIES().privateKey(privKey).publicKey(new bitcore.PublicKey(identity.publicKey));
//         var encrypted = alice.encrypt(message);
//
//         return encrypted.toString('hex');
//     };
//
//     /**
//      * decrypt the message with the privateKey of identity
//      * @param  {{privateKey: ?string, publicKey: string}}   identity
//      * @param  {string}   encrypted
//      * @return {string}   message
//      */
//     var decrypt = function(identity, encrypted) {
//         var privKey = new bitcore.PrivateKey(identity.privateKey);
//         var alice = ECIES().privateKey(privKey);
//
//         var decryptMe = new Buffer(encrypted, 'hex');
//
//         var decrypted = alice.decrypt(decryptMe);
//         return decrypted.toString('ascii');
//     };
//
//
//
// var enc = encrypt(testIdentity, message);
// var dec = decrypt(testIdentity, enc);
//
// if(dec!=message){
//   alert('error');
// }else{
//   alert('sucess');
