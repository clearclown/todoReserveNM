# ──────── build stage ───────────────────────
FROM node:lts-slim AS builder
WORKDIR /monorepo

# 依存をキャッシュ（eslint 設定もコピー）
COPY pnpm-lock.yaml package.json nx.json tsconfig.base.json eslint.config.mjs ./
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile

# ソースをコピーして Nx ビルド
COPY frontend ./frontend

# デバッグ: frontend ディレクトリの内容を確認
RUN ls -al ./frontend

# Nx ビルド
RUN pnpm nx build frontend && \
    echo "ビルド後のdist/frontendの内容:" && ls -al ./dist/frontend

# ─────── runtime stage (nginx) ─────────────
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Nx 出力先をそのままコピー
COPY --from=builder /monorepo/dist/frontend ./

# デバッグ: コピー後のnginx/htmlディレクトリの内容を確認
RUN ls -al /usr/share/nginx/html

EXPOSE 80
