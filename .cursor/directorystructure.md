# ディレクトリ構成

以下のディレクトリ構造に従って実装を行ってください：

```
/
├── backend
│   ├── eslint.config.mjs
│   ├── project.json
│   ├── src
│   │   ├── app
│   │   │   ├── app.controller.spec.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.spec.ts
│   │   │   └── app.service.ts
│   │   ├── assets
│   │   │   └── .gitkeep
│   │   └── main.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── webpack.config.js
├── backend-e2e
│   ├── eslint.config.mjs
│   ├── jest.config.ts
│   ├── project.json
│   ├── src
│   │   ├── backend
│   │   │   └── backend.spec.ts
│   │   └── support
│   │       ├── global-setup.ts
│   │       ├── global-teardown.ts
│   │       └── test-setup.ts
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── docker-compose.yml
├── .dockerignore
├── .env
├── .env.example
├── eslint.config.mjs
├── frontend
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── index.html
│   ├── lib
│   │   └── utils.ts
│   ├── postcss.config.js
│   ├── project.json
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── app
│   │   │   ├── app.spec.tsx
│   │   │   ├── app.tsx
│   │   │   └── nx-welcome.tsx
│   │   ├── assets
│   │   │   └── .gitkeep
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json
│   └── vite.config.ts
├── frontend-e2e
│   ├── eslint.config.mjs
│   ├── playwright.config.ts
│   ├── project.json
│   ├── src
│   │   └── example.spec.ts
│   └── tsconfig.json
├── .github
├── .gitignore
├── infrastructures
│   ├── docker
│   │   ├── backend.Dockerfile
│   │   ├── docker-compose.dev.yml
│   │   ├── Dockerfile.dev
│   │   └── frontend.Dockerfile
│   ├── k8s
│   └── terraform
│       ├── aws
│       └── gcp
├── nx.json
├── package.json
├── pnpm-lock.yaml
├── .prettierignore
├── .prettierrc
├── README.md
├── tsconfig.base.json
└── vitest.workspace.ts

```

### 配置ルール

#### フロントエンド (frontend)
- **UIコンポーネント** → `frontend/src/components/`
  - 共通コンポーネント → `frontend/src/components/ui/`
  - ページ固有コンポーネント → `frontend/src/components/pages/`
  - レイアウトコンポーネント → `frontend/src/components/layouts/`
  - フォームコンポーネント → `frontend/src/components/forms/`

- **ページルーティング** → `frontend/src/routes/`
  - ルート定義 → `frontend/src/routes/index.tsx`
  - ページコンポーネント → `frontend/src/routes/pages/`

- **状態管理** → `frontend/src/stores/`
  - Jotai atoms → `frontend/src/stores/atoms/`
  - Tanstack Query hooks → `frontend/src/stores/queries/`

- **ユーティリティ** → `frontend/src/utils/`
  - ヘルパー関数 → `frontend/src/utils/helpers/`
  - 型定義 → `frontend/src/utils/types/`
  - 定数 → `frontend/src/utils/constants/`

- **スタイル** → `frontend/src/styles/`
  - グローバルスタイル → `frontend/src/styles/globals.css`
  - テーマ設定 → `frontend/src/styles/theme/`

- **API関連処理** → `frontend/src/api/`
  - APIクライアント → `frontend/src/api/client.ts`
  - 自動生成API (Orval) → `frontend/src/api/generated/`
  - APIフック → `frontend/src/api/hooks/`

#### バックエンド (backend)
- **APIエンドポイント** → `backend/src/modules/`
  - 各機能モジュール → `backend/src/modules/{機能名}/`
  - コントローラー → `backend/src/modules/{機能名}/{機能名}.controller.ts`
  - サービス → `backend/src/modules/{機能名}/{機能名}.service.ts`
  - エンティティ → `backend/src/modules/{機能名}/entities/`
  - DTOs → `backend/src/modules/{機能名}/dto/`

- **共通処理** → `backend/src/common/`
  - デコレーター → `backend/src/common/decorators/`
  - フィルター → `backend/src/common/filters/`
  - ガード → `backend/src/common/guards/`
  - インターセプター → `backend/src/common/interceptors/`
  - パイプ → `backend/src/common/pipes/`
  - ミドルウェア → `backend/src/common/middleware/`

- **設定** → `backend/src/config/`
  - 環境設定 → `backend/src/config/env.config.ts`
  - データベース設定 → `backend/src/config/database.config.ts`
  - Redis設定 → `backend/src/config/redis.config.ts`
  - API設定 → `backend/src/config/api.config.ts`

- **データベース** → `backend/src/database/`
  - マイグレーション → `backend/src/database/migrations/`
  - シード → `backend/src/database/seeds/`
  - リポジトリ → `backend/src/database/repositories/`

- **Anthropic API連携** → `backend/src/integrations/anthropic/`
  - APIクライアント → `backend/src/integrations/anthropic/client.ts`
  - プロンプト管理 → `backend/src/integrations/anthropic/prompts/`
  - レスポンス処理 → `backend/src/integrations/anthropic/responses/`

### インフラストラクチャ (infrastructures)
- **Docker設定** → `infrastructures/docker/`
  - 開発環境 → `infrastructures/docker/docker-compose.dev.yml`
  - 本番環境 → `infrastructures/docker/docker-compose.prod.yml`

- **Kubernetes設定** → `infrastructures/k8s/`
  - デプロイメント → `infrastructures/k8s/deployments/`
  - サービス → `infrastructures/k8s/services/`
  - インングレス → `infrastructures/k8s/ingress/`
  - 設定マップ → `infrastructures/k8s/configmaps/`
  - シークレット → `infrastructures/k8s/secrets/`

- **Terraform** → `infrastructures/terraform/`
  - AWS → `infrastructures/terraform/aws/`
  - GCP → `infrastructures/terraform/gcp/`

#### テスト
- **単体テスト** → 各ディレクトリの`__tests__/`サブディレクトリ
  - フロントエンド → `frontend/src/**/__tests__/`
  - バックエンド → `backend/src/**/__tests__/`

- **E2Eテスト**
  - フロントエンド → `frontend-e2e/src/`
  - バックエンド → `backend-e2e/src/`

### 命名規則

#### 共通
- ローカル変数/関数名はロウワーキャメルケース (例 : getUserStatus)
- パブリック変数/関数名はアッパーキャメルケース (例 : GetUserStatus)

### イポート順序
1. ノードモジュール (React, Nestjs など)
2. サードパーティライブラリ (Tanstack, shadcn/ui など)
3. 自作モジュール (相対パス)
4. 型定義
5. スタイル

### コード分割ルール
- 1ファイルにつき最大300行程度を目安に
- 1関数につき最大50行程度を目安に
- 複雑なロジックは適切に分割し、関心ごとに分離する
- UIとロジックの分離 (Container-Presentational パターン推奨)

### コーディング規約
- ESLintの設定に従う
- Prettierの設定に従う
- コメントは日本語で記述可
- 関数やクラスには適切なJSDocを記述

### その他
- 環境変数は`.env`ファイルで管理し、`.env.example`にサンプルを提供
- 秘密情報やキーは`.env`ファイルのみに記載し、リポジトリにコミットしない
- Anthropic APIのバージョンは`claude-3-7-sonnet-20250219`を使用し、変更禁止

これらのルールに従ってプロジェクトを構成することで、一貫性のある保守しやすいコードベースを維持できる。絶対に厳守し、従ってほしい。なお、質問がある場合やupdateが必要な場合は適宜、その旨を申し出てほしい。
