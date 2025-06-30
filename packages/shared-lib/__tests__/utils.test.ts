import { describe, expect, it } from 'vitest';
import {
  chunk,
  deepClone,
  formatDate,
  formatFileSize,
  generateRandomString,
  groupBy,
  omit,
  pick,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  unique,
} from '../src/utils';

describe('String Utils', () => {
  describe('toCamelCase', () => {
    it('should convert string to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('HELLO_WORLD')).toBe('helloWorld');
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });
  });

  describe('toPascalCase', () => {
    it('should convert string to PascalCase', () => {
      expect(toPascalCase('hello world')).toBe('HelloWorld');
      expect(toPascalCase('hello_world')).toBe('HelloWorld');
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert string to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('HelloWorld')).toBe('hello_world');
      expect(toSnakeCase('hello-world')).toBe('hello-world');
    });
  });

  describe('toKebabCase', () => {
    it('should convert string to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
      expect(toKebabCase('hello_world')).toBe('hello_world');
    });
  });
});

describe('Object Utils', () => {
  describe('deepClone', () => {
    it('should deep clone objects', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('should handle arrays', () => {
      const original = [1, 2, { a: 3 }];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[2]).not.toBe(original[2]);
    });

    it('should handle dates', () => {
      const original = new Date();
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['a', 'c']);

      expect(result).toEqual({ b: 2 });
      expect(result).not.toHaveProperty('a');
      expect(result).not.toHaveProperty('c');
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);

      expect(result).toEqual({ a: 1, c: 3 });
      expect(result).not.toHaveProperty('b');
    });
  });
});

describe('Array Utils', () => {
  describe('chunk', () => {
    it('should chunk array into specified size', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const result = chunk(array, 2);

      expect(result).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it('should handle empty array', () => {
      const result = chunk([], 2);
      expect(result).toEqual([]);
    });
  });

  describe('unique', () => {
    it('should remove duplicates', () => {
      const array = [1, 2, 2, 3, 3, 4];
      const result = unique(array);

      expect(result).toEqual([1, 2, 3, 4]);
    });
  });

  describe('groupBy', () => {
    it('should group array by key', () => {
      const array = [
        { id: 1, type: 'a' },
        { id: 2, type: 'b' },
        { id: 3, type: 'a' },
      ];
      const result = groupBy(array, 'type');

      expect(result).toEqual({
        a: [
          { id: 1, type: 'a' },
          { id: 3, type: 'a' },
        ],
        b: [{ id: 2, type: 'b' }],
      });
    });
  });
});

describe('Other Utils', () => {
  describe('generateRandomString', () => {
    it('should generate random string with default length', () => {
      const result = generateRandomString();
      expect(result).toHaveLength(8);
      expect(typeof result).toBe('string');
    });

    it('should generate random string with specified length', () => {
      const result = generateRandomString(10);
      expect(result).toHaveLength(10);
    });
  });

  describe('formatFileSize', () => {
    it('should format file size correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      const result = formatDate(date, 'YYYY-MM-DD');
      expect(result).toBe('2023-01-01');
    });

    it('should use default format', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      const result = formatDate(date);
      expect(result).toMatch(/2023-01-01 12:00:00/);
    });
  });
});
