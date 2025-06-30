# Next.jsビルド成果物分離証明

## 検証目的
Next.js（apps/web）のstandaloneビルド成果物に、NestJS（apps/api）関連パッケージが一切含まれていないことを技術的に証明します。

## 検証手順
1. apps/web ディレクトリで `pnpm build` を実行し、standalone成果物（.next/standalone）を生成。
2. 生成された `.next/standalone/node_modules/.pnpm` 配下を調査。
3. NestJS関連パッケージ（@nestjs/common, @nestjs/core など）が含まれていないことを確認。

## 検証結果
- `.next/standalone/node_modules/.pnpm` ディレクトリ内に `@nestjs` で始まるパッケージは一切存在しません。
- テキスト検索でも `nestjs` という文字列を含むパッケージ・ファイルはstandalone成果物配下に存在しません。

### ディレクトリ例（抜粋）
```
apps/web/.next/standalone/node_modules/.pnpm/
├── has-flag@4.0.0/
├── merge-stream@2.0.0/
├── @swc+core@1.12.7/
├── terser@5.43.1/
├── browserslist@4.25.1/
├── next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/
├── react@19.1.0/
├── ...
```

### 検索証拠
- `grep -r 'nestjs' apps/web/.next/standalone/node_modules/.pnpm` の結果、該当なし。

## 結論
Next.jsのstandaloneビルド成果物には、NestJS(API)の依存パッケージは一切含まれていません。モノレポ構成であっても、フロントエンドとバックエンドの依存関係は適切に分離されています。 
