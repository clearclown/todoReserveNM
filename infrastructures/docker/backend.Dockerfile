# ──────── build stage ───────────────────────
FROM node:lts-slim AS builder
WORKDIR /monorepo

# 依存ファイルのみ先にコピーしてキャッシュ最大化
COPY pnpm-lock.yaml package.json nx.json tsconfig.base.json ./
COPY eslint.config.mjs ./
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile

# 必要なワークスペースをコピー
COPY backend ./backend

# デバッグ: ビルド前にディレクトリ構造を確認
RUN echo "ディレクトリ構造:" && \
    find . -type d -maxdepth 3 && \
    echo "backend/project.json内容:" && \
    cat backend/project.json

# ──── NestJS ビルド ────
# webpack が大量メモリを消費するためヒープ上限を 4GB に拡張
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm nx build backend --skip-nx-cache

# デバッグ: ビルド成果物の確認
RUN echo "ビルド成果物の確認:" && \
    find . -name "*.js" -path "*/dist/*" | grep -v "node_modules" && \
    echo "dist直下のディレクトリ:" && \
    ls -la ./dist && \
    echo "appsディレクトリの確認:" && \
    ls -la ./dist/apps && \
    echo "backendディレクトリの確認:" && \
    ls -la ./dist/apps/backend

# ──────── runtime stage ─────────────────────
FROM node:lts-slim
WORKDIR /app
ENV NODE_ENV=production

# ビルド成果物をコピー
COPY --from=builder /monorepo/dist/apps/backend/ ./

# 同じバージョンの node_modules を runtime にコピー
COPY --from=builder /monorepo/node_modules ./node_modules

# デバッグ: コピー後のファイル確認
RUN echo "コピー後のファイル確認:" && \
    ls -la /app && \
    echo "main.jsファイルの有無:" && \
    find /app -name "main.js" | grep -v "node_modules" || echo "main.jsが見つかりません"

# 健康チェック (10 秒ごとに 3 回失敗でダウン判定)
HEALTHCHECK --interval=10s --timeout=3s --retries=3 CMD curl -f http://localhost:${APP_PORT}/health || exit 1

EXPOSE ${APP_PORT}
# パスを修正: srcディレクトリ内のmain.jsを実行
CMD ["node", "src/main.js"]
