import { enc } from 'crypto-js';
import AES from 'crypto-js/aes';

import type { AesDecryptObjectParams, AesEncryptObjectParams, ObjectLike } from '@/typings';

/**
 * Encrypts an object using AES encryption.
 *
 * @template T - The type of the input object.
 * @param {AesEncryptObjectParams<T>} params - The encryption parameters.
 * @param {T} params.input - The object to be encrypted.
 * @param {string} params.secretKey - The secret key for encryption.
 * @returns {string} The encrypted data as a string in Hex format.
 * @throws {TypeError} If the input is not an object.
 */
export function encryptObject<T extends ObjectLike>(params: AesEncryptObjectParams<T>): string {
  if (typeof params.input !== 'object') {
    throw new TypeError('input must be an object');
  }
  return AES.encrypt(JSON.stringify(params.input), params.secretKey).toString();
}

/**
 * Decrypts an AES-encrypted string back into an object.
 *
 * @template T - The expected type of the decrypted object.
 * @param {AesDecryptObjectParams} params - The decryption parameters.
 * @param {string} params.input - The encrypted string in Hex format.
 * @param {string} params.secretKey - The secret key used for decryption.
 * @param {Encoder} [params.encoder=enc.Utf8] - The text encoder for decoding the bytes. Defaults to Utf8.
 * @returns {T | null} The decrypted object if successful, or null if decryption fails.
 */
export function decryptObject<T extends ObjectLike>(params: AesDecryptObjectParams): T | null {
  const { input, secretKey, encoder = enc.Utf8 } = params;

  if (typeof (input as unknown) !== 'string' || typeof (secretKey as unknown) !== 'string') {
    return null;
  }

  const bytes = AES.decrypt(input, secretKey);

  try {
    const result = JSON.parse(bytes.toString(encoder));
    return result as T;
  } catch (error) {
    return null;
  }
}

export type {
  AesDecryptObjectParams,
  AesEncryptObjectParams,
  ObjectLike,
  Encoder,
} from './typings';
