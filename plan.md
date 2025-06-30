# pnpm Monorepo - Biome v2.0移行プロジェクト

## Notes
- プロジェクト: pnpmワークスペースを使用したNext.js + NestJSモノレポ
- 現在の状況: README.mdでESLintの記述があるが、Biome v2.0への移行が必要
- Biome v2.0の特徴: TypeScriptコンパイラに依存しない型推論機能、マルチファイル解析、モノレポサポートの改善
- 移行対象: packages/eslint-config-customの記述をBiome設定に変更
- Biome v2.0の利点: 
  - TypeScriptコンパイラに依存しない型推論
  - マルチファイル解析とモノレポサポートの改善
  - ネストした設定ファイルのサポート
  - プラグインシステム
  - インポート整理機能の改善
  - HTMLフォーマッター（実験的）
- 完了した作業:
  - README.mdのディレクトリ構造をBiome v2.0対応に更新
  - 4.1節の共有設定管理をBiome v2.0に変更
  - ルートのbiome.json設定ファイルを作成
  - turbo.jsonにformat、checkタスクを追加
  - ルートpackage.jsonをBiome v2.0対応に更新
  - 各アプリケーションのpackage.jsonをBiome v2.0対応に更新
  - 各アプリケーション用のbiome.json設定ファイルを作成

## Task List
- [x] plan.mdファイルの作成
- [x] README.mdのESLint記述をBiome v2.0設定に修正
- [x] Biome設定ファイルの作成（biome.json）
- [x] 共有設定パッケージの構造をBiome対応に変更
- [x] 各アプリケーションの設定をBiome対応に更新

## Current Goal
README.mdのESLint記述をBiome v2.0を利用する形に修正し、モダンなリンター・フォーマッター環境を構築する

## 移行完了
- ESLintからBiome v2.0への移行が完了しました
- モノレポ全体でBiome v2.0を使用した統一された開発環境が構築されました
- TypeScriptコンパイラに依存しない型推論機能を活用できるようになりました
- マルチファイル解析と改善されたモノレポサポートにより、より正確なコード解析が可能になりました 
