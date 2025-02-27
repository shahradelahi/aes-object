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
  /**
   * The initialization vector (IV) used for encryption.
   * If not provided, a random IV will be generated.
   */
  readonly iv?: string;
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
  /**
   * The initialization vector (IV) used for decryption.
   * If not provided, it uses the IV from the encrypted data.
   */
  readonly iv?: string;
}
