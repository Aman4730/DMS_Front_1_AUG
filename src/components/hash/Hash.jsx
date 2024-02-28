// cryptoUtils.js
import CryptoJS from "crypto-js";

const secretKey = "yourSecretKey";

export function encryptData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decryptData(encryptedData) {
  return CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
}
