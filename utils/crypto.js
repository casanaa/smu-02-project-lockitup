const crypto = require('crypto');
const algorithm = 'aes-128-ecb'; //Using AES encryption
const hexKey = process.env.SECURITY_KEY; 

let key = [];
for (let k = 0; k < hexKey.length; k += 2) {
  key.push(parseInt(hexKey.substr(k, 2), 16));
}

module.exports = {
  generateKey: () => {
    newKey = crypto.randomBytes(16);
    return newKey.toString('hex');
  },
  encrypt: (rawString) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), null);
    let encrypted = cipher.update(rawString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encryptedData = encrypted.toString('hex');
  },
  decrypt: (encryptedString) => {
    let encryptedText = Buffer.from(encryptedString, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), null);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
