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
      const encryptedData2 = encryptObject({ input, secretKey });
      expect(encryptedData).not.toEqual(encryptedData2);
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
      const input =
        'O3RLigH6ASctDE1NjZKEhDO43USj4lZbO7NSvGlygMg4XJKfntgZtFZS6c3z+OGbWp+D+NImDDRyDBtITEhrVw==';
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
