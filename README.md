<h1 align="center">
  <sup>aes-object</sup>
  <br>
  <a href="https://github.com/shahradelahi/aes-object/actions/workflows/ci.yml"><img src="https://github.com/shahradelahi/aes-object/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="CI"></a>
  <a href="https://www.npmjs.com/package/aes-object"><img src="https://img.shields.io/npm/v/aes-object.svg" alt="NPM Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License"></a>
  <a href="https://bundlephobia.com/package/aes-object"><img src="https://img.shields.io/bundlephobia/minzip/aes-object" alt="npm bundle size"></a>
  <a href="https://packagephobia.com/result?p=aes-object"><img src="https://packagephobia.com/badge?p=aes-object" alt="Install Size"></a>
</h1>

_aes-object_ is a lightweight library that leverages AES encryption to securely encrypt and decrypt JavaScript objects, supporting arrays, records, buffers, and more.

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

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install aes-object
```

**yarn**

```bash
yarn add aes-object
```

</details>

## 📖 Usage

### Basic Usage

```ts
import { decryptObject, encryptObject } from 'aes-object';

const secretKey = 'mySecretKey';
const data = { message: Buffer.from('Hello, world!') };

const encrypted = encryptObject({ input: data, secretKey });
const decrypted = decryptObject({ input: encrypted, secretKey });

console.log(decrypted.message.toString()); // Hello, world!
```

### Custom Initialization Vector (IV)

Provide a custom hex-encoded IV for encryption and decryption.

```ts
const iv = '4f6c4293f0699cf6a27e7f7b2c95cbe1';

const encrypted = encryptObject({
  input: { role: 'admin' },
  secretKey: 'mySecretKey',
  iv,
});

const decrypted = decryptObject({
  input: encrypted,
  secretKey: 'mySecretKey',
  iv,
});
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/aes-object).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/aes-object).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/aes-object/graphs/contributors).
