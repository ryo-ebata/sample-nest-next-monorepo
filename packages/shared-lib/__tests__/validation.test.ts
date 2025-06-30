import { describe, expect, it } from 'vitest';
import {
  createUserSchema,
  emailSchema,
  loginSchema,
  nameSchema,
  paginationSchema,
  passwordSchema,
  searchSchema,
  updateUserSchema,
} from '../src/validation';

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('should validate valid email', () => {
      const result = emailSchema.safeParse('test@example.com');
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = emailSchema.safeParse('invalid-email');
      expect(result.success).toBe(false);
    });

    it('should reject empty string', () => {
      const result = emailSchema.safeParse('');
      expect(result.success).toBe(false);
    });
  });

  describe('passwordSchema', () => {
    it('should validate valid password', () => {
      const result = passwordSchema.safeParse('Password123');
      expect(result.success).toBe(true);
    });

    it('should reject password without uppercase', () => {
      const result = passwordSchema.safeParse('password123');
      expect(result.success).toBe(false);
    });

    it('should reject password without lowercase', () => {
      const result = passwordSchema.safeParse('PASSWORD123');
      expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
      const result = passwordSchema.safeParse('Password');
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const result = passwordSchema.safeParse('Pass1');
      expect(result.success).toBe(false);
    });
  });

  describe('nameSchema', () => {
    it('should validate valid name', () => {
      const result = nameSchema.safeParse('John Doe');
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = nameSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject long name', () => {
      const longName = 'a'.repeat(51);
      const result = nameSchema.safeParse(longName);
      expect(result.success).toBe(false);
    });
  });

  describe('createUserSchema', () => {
    it('should validate valid user data', () => {
      const userData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'Password123',
      };
      const result = createUserSchema.safeParse(userData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid user data', () => {
      const userData = {
        email: 'invalid-email',
        name: '',
        password: 'weak',
      };
      const result = createUserSchema.safeParse(userData);
      expect(result.success).toBe(false);
    });
  });

  describe('updateUserSchema', () => {
    it('should validate valid update data', () => {
      const updateData = {
        email: 'new@example.com',
        name: 'Jane Doe',
      };
      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(true);
    });

    it('should allow partial updates', () => {
      const updateData = {
        email: 'new@example.com',
      };
      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const updateData = {
        email: 'invalid-email',
      };
      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('should validate valid login data', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'anypassword',
      };
      const result = loginSchema.safeParse(loginData);
      expect(result.success).toBe(true);
    });

    it('should reject empty password', () => {
      const loginData = {
        email: 'test@example.com',
        password: '',
      };
      const result = loginSchema.safeParse(loginData);
      expect(result.success).toBe(false);
    });
  });

  describe('paginationSchema', () => {
    it('should validate valid pagination params', () => {
      const paginationData = {
        page: 1,
        limit: 10,
      };
      const result = paginationSchema.safeParse(paginationData);
      expect(result.success).toBe(true);
    });

    it('should use default values', () => {
      const result = paginationSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(10);
      }
    });

    it('should reject negative page', () => {
      const paginationData = {
        page: -1,
        limit: 10,
      };
      const result = paginationSchema.safeParse(paginationData);
      expect(result.success).toBe(false);
    });

    it('should reject large limit', () => {
      const paginationData = {
        page: 1,
        limit: 101,
      };
      const result = paginationSchema.safeParse(paginationData);
      expect(result.success).toBe(false);
    });
  });

  describe('searchSchema', () => {
    it('should validate valid search params', () => {
      const searchData = {
        query: 'test query',
      };
      const result = searchSchema.safeParse(searchData);
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const searchData = {
        query: '',
      };
      const result = searchSchema.safeParse(searchData);
      expect(result.success).toBe(false);
    });

    it('should reject long query', () => {
      const searchData = {
        query: 'a'.repeat(101),
      };
      const result = searchSchema.safeParse(searchData);
      expect(result.success).toBe(false);
    });

    it('should allow optional filters', () => {
      const searchData = {
        query: 'test',
        filters: { category: 'test' },
      };
      const result = searchSchema.safeParse(searchData);
      expect(result.success).toBe(true);
    });
  });
});
