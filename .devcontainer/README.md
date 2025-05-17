# VS Code Dev Container の使い方

このプロジェクトは VS Code の Dev Container 機能を使用して開発環境を統一しています。

## 前提条件

以下のソフトウェアがインストールされている必要があります：

1. [Visual Studio Code](https://code.visualstudio.com/)
2. [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. [Remote - Containers 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## 使用方法

1. このリポジトリをクローンします。
2. VS Code でプロジェクトを開きます。
3. VS Code の左下の緑色のアイコンをクリックします。
4. 表示されるメニューから「Reopen in Container」を選択します。
5. コンテナのビルドが完了するまで待ちます（初回は数分かかることがあります）。

## コンテナ内の機能

- Node.js LTS
- pnpm パッケージマネージャー
- Git
- PostgreSQL クライアント
- その他開発に必要なツール

## ポート

以下のポートがホストマシンにフォワードされます：

- 3000: バックエンドAPI (NestJS)
- 5173: フロントエンド開発サーバー (Vite)
- 5432: PostgreSQL データベース

## トラブルシューティング

### コンテナが起動しない場合

1. Docker Desktopが起動していることを確認してください。
2. VS Code を再起動してみてください。
3. `Remote-Containers: Rebuild Container` コマンドを実行してみてください。

### パッケージの更新

新しいパッケージをインストールした後や、`package.json` が変更された場合：

```bash
pnpm install
```

を実行してください。

### データベース接続

PostgreSQL データベースに接続するには以下の設定を使用します：

- ホスト: `db`（コンテナ内から接続する場合）または `localhost`（ホストマシンから接続する場合）
- ポート: 5432
- ユーザー名: postgres
- パスワード: postgres
- データベース名: todoreserve
