# aes-object

[![CI](https://github.com/shahradelahi/aes-object/actions/workflows/ci.yml/badge.svg)](https://github.com/shahradelahi/aes-object/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/aes-object.svg)](https://www.npmjs.com/package/aes-object)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
[![Install Size](https://packagephobia.com/badge?p=aes-object)](https://packagephobia.com/result?p=aes-object)

A lightweight library that leverages AES encryption to securely encrypt and decrypt JavaScript objects—supporting arrays, records, buffers, and more.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install aes-object
```

## 📖 Usage

```typescript
import { decryptObject, encryptObject } from 'aes-object';

const secretKey = 'mySecretKey';
const data = { message: Buffer.from('Hello, world!') };

const encrypted = encryptObject({ input: data, secretKey });
console.log('Encrypted:', encrypted); // S7WhaSK63RuL3r+AQ5cG5AMSG9r4356DX1wUXZXgTUgeh19GlTl1wbsW1+jZUBqJl0pBKDMBBxAKDrTOqBbD0U5clObURb2OyRCKsf1LtqM=

const decrypted = decryptObject({ input: encrypted, secretKey });
console.log('Decrypted:', decrypted); // { message: <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21> }

console.log('Message:', decrypted.message.toString()); // Hello, world!;
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/aes-object).

##### API

<!-- prettier-ignore -->
```typescript
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
function encryptObject<T extends ObjectLike>(params: AesEncryptObjectParams<T>): string;

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
function decryptObject<T extends ObjectLike>(params: AesDecryptObjectParams): T | null;
```

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/aes-object)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/aes-object/graphs/contributors).
