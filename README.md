# todoReserve

## 使用技術

### コア技術
- [Nx](https://nx.dev): ^21.0.3
- TypeScript
- Node.js: ^22.15.0
- npx: ^11.3.0
- pnpm: ^10.10.0
- Docker, Docker compose
- **AIモデル: claude-3-7-sonnet-20250219 (Anthropic Messages API 2023-06-01) ← バージョン変更禁止**

### フロントエンド
- pnpm
- Vite
- TypeScript
- React.js
- shadcn/ui
- TailwindCSS
- Tanstack Router
- Tanstack Form
- Tanstack Query
- Orval
- Jotai

### バックエンド
- pnpm
- nest.js
- TypeScript
- Express.js

### Database
- Redis
- PostGreSQL

### 開発ツール
- Docker
- Github Action
- Git, GitHub

### テスト
- 単体 : [vitest](https://vitest.dev) : ^3.1.3
- 結合 : playwrite

## 基本コマンド
1. Docker compose

```bash
docker compose up --build -d
```

2. ファイル構造表示

```bash
tree -a -I 'node_modules|.git|.nx|.pnpm-store|.vscode|docs|.cursor'
```

### 🐳 Docker での開発・本番

#### 1. `.env` を作る
`.env.example` をコピーして編集。

```bash
cp .env.example .env
````


#### 2. イメージをビルド＆起動

```bash
docker compose up -d --build
```

| コンテナ     | 開放ポート       | 用途         |
| -------- | ----------- | ---------- |
| db       | 5432        | PostgreSQL |
| backend  | \$APP\_PORT | NestJS API |
| frontend | 5173        | 静的 SPA     |

#### 3. 停止・削除

```bash
docker compose down -v   # ボリュームも削除
```

```bash
docker system prune -a --volumes --force
```
# todoReserveNM
