import type { enc } from 'crypto-js';

export type ObjectLike =
  | Record<string | number | symbol, unknown>
  | Array<unknown>
  | Buffer
  | object;

export interface AesEncryptObjectParams<T extends ObjectLike> {
  input: T;
  secretKey: string;
}

export interface AesDecryptObjectParams {
  input: string;
  secretKey: string;
  encoder?: Encoder;
}

export type Encoder = typeof enc.Utf8;
