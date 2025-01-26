import { enc } from 'crypto-js';
import AES from 'crypto-js/aes';

import type { AesDecryptObjectParams, AesEncryptObjectParams, ObjectLike } from '@/typings';

export function encryptObject<T extends ObjectLike>(params: AesEncryptObjectParams<T>): string {
  if (typeof params.input !== 'object') {
    throw new TypeError('input must be an object');
  }
  return AES.encrypt(JSON.stringify(params.input), params.secretKey).toString();
}

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
