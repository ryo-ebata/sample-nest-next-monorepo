import { z } from 'zod';

// 基本バリデーションスキーマ
export const emailSchema = z
  .string()
  .email('有効なメールアドレスを入力してください')
  .min(1, 'メールアドレスは必須です');

export const passwordSchema = z
  .string()
  .min(8, 'パスワードは8文字以上である必要があります')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'パスワードは大文字、小文字、数字を含む必要があります'
  );

export const nameSchema = z
  .string()
  .min(1, '名前は必須です')
  .max(50, '名前は50文字以下である必要があります');

// ユーザー関連のバリデーション
export const createUserSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  name: nameSchema.optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'パスワードは必須です'),
});

// ページネーション用のバリデーション
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

// 検索用のバリデーション
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, '検索クエリは必須です')
    .max(100, '検索クエリは100文字以下である必要があります'),
  filters: z.record(z.any()).optional(),
});

// ファイルアップロード用のバリデーション
export const fileUploadSchema = z.object({
  file: z.instanceof(File).optional(),
  maxSize: z
    .number()
    .positive()
    .default(5 * 1024 * 1024), // 5MB
  allowedTypes: z
    .array(z.string())
    .default(['image/jpeg', 'image/png', 'image/gif']),
});

// 環境変数用のバリデーション
export const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url('有効なデータベースURLを入力してください'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRETは32文字以上である必要があります'),
  API_BASE_URL: z.string().url('有効なAPIベースURLを入力してください'),
});

// 型推論用の型エクスポート
export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type SearchParams = z.infer<typeof searchSchema>;
export type FileUploadParams = z.infer<typeof fileUploadSchema>;
export type Environment = z.infer<typeof environmentSchema>;
