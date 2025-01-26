export type ObjectLike =
  | Record<string | number | symbol, unknown>
  | Array<unknown>
  | Buffer
  | object;

export interface AesEncryptObjectParams<T extends ObjectLike> {
  /**
   * The object to be encrypted.
   */
  readonly input: T;
  /**
   * The secret key used for encryption.
   */
  readonly secretKey: string;
}

export interface AesDecryptObjectParams {
  /**
   * The encrypted string in Hex format.
   */
  readonly input: string;
  /**
   * The secret key used for decryption.
   */
  readonly secretKey: string;
}
