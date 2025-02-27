import MSGPack from '@se-oss/msgpack';
import CryptoJS from 'crypto-js';

import type { AesDecryptObjectParams, AesEncryptObjectParams, ObjectLike } from '@/typings';

// -- Internal

function deriveKey(password: string, salt: string, keySize = 256, iterations = 10000) {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
}

function randomSalt(length = 16) {
  return CryptoJS.lib.WordArray.random(length);
}

// -- Exported

/**
 * Encrypts an object using AES encryption.
 *
 * @template T - The type of the input object.
 * @param {AesEncryptObjectParams<T>} params - The encryption parameters.
 * @param {T} params.input - The object to be encrypted.
 * @param {string} params.secretKey - The secret key for encryption.
 * @param {string} [params.iv] - The initialization vector (IV) for encryption. If not provided, a random IV will be generated.
 * @returns {string} The encrypted data as a string in Base64 format.
 * @throws {TypeError} If the input is not an object.
 */
export function encryptObject<T extends ObjectLike>(params: AesEncryptObjectParams<T>): string {
  if (typeof params.input !== 'object') {
    throw new TypeError('input must be an object');
  }

  const salt = randomSalt();
  const key = deriveKey(params.secretKey, salt.toString());
  const iv = params.iv ? CryptoJS.enc.Hex.parse(params.iv) : randomSalt();

  const stringified = MSGPack.stringify(params.input);
  const encrypted = CryptoJS.AES.encrypt(stringified, key, { iv: iv });

  return CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
}

/**
 * Decrypts an AES-encrypted string back into an object.
 *
 * @template T - The expected type of the decrypted object.
 * @param {AesDecryptObjectParams} params - The decryption parameters.
 * @param {string} params.input - The encrypted string in Base64 format.
 * @param {string} params.secretKey - The secret key used for decryption.
 * @param {string} [params.iv] - The initialization vector (IV) used for decryption. If not provided, it uses the IV from the encrypted data.
 * @returns {T | null} The decrypted object if successful, or null if decryption fails.
 */
export function decryptObject<T extends ObjectLike>(params: AesDecryptObjectParams): T | null {
  const { input, secretKey } = params;

  if (typeof (input as unknown) !== 'string' || typeof (secretKey as unknown) !== 'string') {
    return null;
  }

  const ciphertextWA = CryptoJS.enc.Base64.parse(input);

  const salt = CryptoJS.lib.WordArray.create(ciphertextWA.words.slice(0, 4));
  const key = deriveKey(secretKey, salt.toString());
  const iv = params.iv
    ? CryptoJS.enc.Hex.parse(params.iv)
    : CryptoJS.lib.WordArray.create(ciphertextWA.words.slice(4, 8));

  const decrypted = CryptoJS.AES.decrypt(
    // @ts-expect-error Not all members of CipherParams are implemented
    {
      ciphertext: CryptoJS.lib.WordArray.create(
        ciphertextWA.words.slice(salt.words.length + iv.words.length)
      ),
    },
    key,
    { iv }
  ).toString();
  const decryptedHex = CryptoJS.enc.Hex.parse(decrypted).toString(CryptoJS.enc.Utf8);

  try {
    const result = MSGPack.parse(decryptedHex);
    return result as T;
  } catch (error) {
    return null;
  }
}

export type { AesDecryptObjectParams, AesEncryptObjectParams, ObjectLike };
