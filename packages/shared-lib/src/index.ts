// 共有ライブラリのメインエクスポート

// 型定義のエクスポート
export * from './types';
// ユーティリティ関数のエクスポート
export * from './utils';

// バージョン情報
export const VERSION = '1.0.0';

// ↓ 明示的に型名を再エクスポート
export type {
  CreateUserRequest as ValidationCreateUserRequest,
  Environment as ValidationEnvironment,
  LoginRequest as ValidationLoginRequest,
  PaginationParams as ValidationPaginationParams,
  UpdateUserRequest as ValidationUpdateUserRequest,
} from './validation';
