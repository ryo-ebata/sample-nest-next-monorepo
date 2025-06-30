# apps/api/Dockerfile

# --- ステージ 1: ベースイメージ ---
# 全ステージで共通のNode.jsとpnpm環境を定義
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# pnpm 10系を明示的にインストール
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# --- ステージ 2: プルーナー ---
# モノレポ全体をコンテキストとして受け取り、'api'に必要なファイルのみを抽出
FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
# '@sample/api'スコープで枝刈りを行い、Dockerビルドに最適化されたout/ディレクトリを生成
RUN turbo prune @sample/api --docker

# --- ステージ 3: ビルダー ---
# 枝刈りされた環境で依存関係をインストールし、アプリケーションをビルド
FROM base AS builder
WORKDIR /app

# turboをグローバルインストール
RUN pnpm add -g turbo

# 依存関係定義ファイルのみをコピーし、インストールを実行
# このレイヤーは依存関係が変更されない限りキャッシュされる
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-workspace.yaml .
COPY --from=pruner /app/out/pnpm-lock.yaml .
COPY --from=pruner /app/.npmrc .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# ソースコードをコピーし、ビルドを実行
COPY --from=pruner /app/out/full/ .
COPY turbo.json .
# '@sample/api'をビルドし、apps/api/dist ディレクトリを生成
RUN turbo build --filter=@sample/api

# --- ステージ 4: デプロイヤー ---
# ビルド済みアーティファクトから、最終的なデプロイパッケージを作成
FROM builder AS deployer

# pnpm deployコマンドを使い、ビルド成果物とプロダクション依存関係のみを /deploy に抽出
# 事前に apps/api/package.json の "files" に "dist" を含めることが必須
RUN pnpm --filter @sample/api deploy --prod /deploy

# --- ステージ 5: ランナー ---
# 最小構成のプロダクションイメージ
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# セキュリティのベストプラクティスとして非ルートユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

# デプロイヤーから、クリーンで自己完結したアーティファクトのみをコピー
COPY --from=deployer --chown=nodejs:nodejs /deploy .

EXPOSE 3000
ENV PORT=3000

# NestJSアプリケーションを起動
CMD ["node", "dist/main.js"] 
