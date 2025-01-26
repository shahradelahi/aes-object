import { describe, expect, test } from 'vitest';

import { decryptObject, encryptObject } from '@/index';

describe('aes-object', () => {
  describe('encrypt', () => {
    test('should encrypt an object', () => {
      const input = { name: 'John Doe' };
      const secretKey = 'my-secret-key';
      const encryptedData = encryptObject({ input, secretKey });
      const decryptedData = decryptObject({ input: encryptedData, secretKey });
      expect(decryptedData).toEqual(input);
    });

    test('should throw an error if data is not an object', () => {
      const input = 'not an object';
      const secretKey = 'my-secret-key';
      // @ts-expect-error Type 'string' is not assignable to type 'ObjectLike'.
      expect(() => encryptObject({ input, secretKey })).toThrow(TypeError);
    });
  });

  describe('decrypt', () => {
    test('should decrypt an object', () => {
      const input = { name: 'John Doe' };
      const secretKey = 'my-secret-key';
      const encryptedData = encryptObject({ input, secretKey });
      const decryptedData = decryptObject({ input: encryptedData, secretKey });
      expect(decryptedData).toEqual(input);
    });

    test('should return null if decryption fails', () => {
      const input = 'invalid data';
      const secretKey = 'my-secret-key';
      const decryptedData = decryptObject({ input, secretKey });
      expect(decryptedData).toBeNull();
    });

    test('should return null if decryption fails', () => {
      const input = 'U2FsdGVkX1+D+qc8JBrry6u/Umr+iYQ0ayfD37T7BzbEH5a6YwnAl2dU3T/pu20C';
      const wrongKey = 'wrong-key';
      const decryptedData = decryptObject({ input, secretKey: wrongKey });
      expect(decryptedData).toBeNull();

      const secretKey = 'my-secret-key';
      const expectedData = { name: 'John Doe' };
      const decryptedData2 = decryptObject({ input, secretKey });
      expect(decryptedData2).toEqual(expectedData);
    });
  });
});
