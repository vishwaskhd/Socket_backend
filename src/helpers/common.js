const crypto = require('crypto');
const constant=require('./constant')

exports.encryptPassword=async(password)=>{
    const hash =  crypto.createHash('sha512');
    hash.update(password + constant.encryption_key);
    const hashedString = hash.digest('hex');
    return  hashedString
}
