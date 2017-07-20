import config from '../config';
let crypto = require('crypto')


/** 
 * 加密函数 
 * @param text  需要加密的内容 
 * @returns {Query|*}  密文 
 */
export function encode(text: any) {
    const cipher = crypto.createCipheriv('aes-128-cbc', config.secret, '1234567890123456');
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
}


/** 
 * 解密函数 
 * @param text  需要解密的内容 
 * @returns {Query|*} 
 */
export function decode(text: any) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', config.secret, '1234567890123456');
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');//解密之后的值  
    console.log(dec);
    return dec;
}  