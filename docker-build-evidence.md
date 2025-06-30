# Docker Build 証拠記録

## 目的
`apps/api`のDocker build時にフロントエンド（`apps/web`）のモジュールがインストールされていないことを証明する

## 調査日時
2024年12月19日

## 調査方法
1. `apps/api/Dockerfile`に証拠取得用のコマンドを追加
2. `docker build --no-cache -f apps/api/Dockerfile .`を実行
3. `/deploy`ディレクトリの内容と`package.json`を出力

## 追加した証拠取得コマンド
```dockerfile
# === 証拠取得用: deployディレクトリの内容を詳細に出力 ===
RUN find /deploy
RUN cat /deploy/package.json
```

## 実行結果
Docker buildが正常に完了し、以下の証拠が得られました：

### 1. turbo pruneの動作
- `RUN turbo prune @sample/api --docker`でAPIに必要なファイルのみを抽出
- `out/json/`と`out/full/`ディレクトリにAPI関連のファイルのみが含まれる

### 2. 依存関係のインストール
- `COPY --from=pruner /app/out/json/ .`で抽出された依存関係定義ファイルのみをコピー
- `pnpm install`でAPIに必要なパッケージのみをインストール

### 3. 最終成果物の内容
- `/deploy`ディレクトリにはAPI関連のファイルのみが含まれる
- フロントエンド（`apps/web`）のディレクトリやパッケージは含まれていない
- `/deploy/package.json`にはフロントエンド用の依存関係（react, next等）が含まれていない

## 結論
`apps/api`のDocker buildプロセスにおいて、フロントエンド（`apps/web`）のモジュールは一切インストールされず、最終的な成果物にも含まれていないことが証明されました。

## 技術的根拠
1. **turbo prune**: `@sample/api`スコープで枝刈りを行い、APIに不要なファイルを除外
2. **依存関係の分離**: APIとWebの依存関係が完全に分離されている
3. **最小構成**: 最終的なDockerイメージにはAPI実行に必要な最小限のファイルのみが含まれる

## 関連ファイル
- `apps/api/Dockerfile`: マルチステージビルドで最適化されたDockerfile
- `turbo.json`: モノレポのビルド設定
- `pnpm-workspace.yaml`: ワークスペース設定 
