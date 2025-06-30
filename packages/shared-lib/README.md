# @sample/shared-lib

Next.jsとNestJSアプリケーションで共有利用するTypeScriptライブラリです。

## 概要

このライブラリは、モノレポ構成のNext.jsフロントエンドとNestJSバックエンドで共通して使用する型定義、バリデーション、ユーティリティ関数を提供します。

## 機能

### 型定義 (`types`)
- APIレスポンス型
- ページネーション型
- ユーザー関連型
- 認証関連型
- 環境変数型
- エラーハンドリング型
- ログ関連型

### バリデーション (`validation`)
- Zodを使用した型安全なバリデーション
- メールアドレス、パスワード、名前のバリデーション
- ユーザー作成・更新用スキーマ
- ログイン用スキーマ
- ページネーション用スキーマ
- 検索用スキーマ

### ユーティリティ関数 (`utils`)
- 文字列変換（キャメルケース、パスカルケース、スネークケース、ケバブケース）
- オブジェクト操作（ディープクローン、omit、pick）
- 配列操作（チャンク分割、重複除去、グループ化）
- 非同期処理（遅延実行、デバウンス、スロットル）
- フォーマット関数（ファイルサイズ、日付）

## インストール

このライブラリはpnpmワークスペース内で利用可能です。

```bash
# ルートディレクトリで実行
pnpm install
```

## 使用方法

### Next.jsアプリケーションでの使用

```typescript
// apps/web/src/app/page.tsx
import { 
  User, 
  createUserSchema, 
  toCamelCase, 
  formatDate 
} from '@sample/shared-lib';

// 型定義の使用
const user: User = {
  id: '1',
  email: 'test@example.com',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date()
};

// バリデーションの使用
const userData = {
  email: 'test@example.com',
  name: 'John Doe',
  password: 'Password123'
};

const validationResult = createUserSchema.safeParse(userData);
if (validationResult.success) {
  // バリデーション成功
  console.log(validationResult.data);
} else {
  // バリデーションエラー
  console.error(validationResult.error);
}

// ユーティリティ関数の使用
const camelCaseName = toCamelCase('hello world'); // 'helloWorld'
const formattedDate = formatDate(new Date(), 'YYYY-MM-DD'); // '2023-12-01'
```

### NestJSアプリケーションでの使用

```typescript
// apps/api/src/users/users.controller.ts
import { 
  User, 
  CreateUserRequest, 
  ApiResponse, 
  createUserSchema 
} from '@sample/shared-lib';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() userData: CreateUserRequest): Promise<ApiResponse<User>> {
    // バリデーション
    const validationResult = createUserSchema.safeParse(userData);
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid user data',
        message: validationResult.error.message
      };
    }

    // ユーザー作成処理
    const user: User = {
      id: '1',
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return {
      success: true,
      data: user
    };
  }
}
```

## 開発

### ビルド

```bash
cd packages/shared-lib
pnpm build
```

### テスト

```bash
cd packages/shared-lib
pnpm test
```

### 開発モード（ウォッチ）

```bash
cd packages/shared-lib
pnpm dev
```

## 依存関係

- **zod**: 型安全なバリデーション
- **typescript**: TypeScriptコンパイラ
- **jest**: テストフレームワーク

## ライセンス

MIT 
