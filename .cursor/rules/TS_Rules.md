# TypeScript スタイルガイド ＆ セキュリティ指針

## 命名規則
### 変数・関数
- ローカル変数/関数名はロウワーキャメルケース (例 : getUserStatus)
- パブリック変数/関数名はアッパーキャメルケース (例 : GetUserStatus)

  ```ts
  // ❌ Bad
  var FooVar;
  function BarFunc() {}

  // ✅ Good
  const fooVar = 42;
  function barFunc() {}
  ```

### クラス

* クラス名は **PascalCase** とする。メンバ・メソッドは **camelCase**。

  ```ts
  // ❌ Bad
  class foo {
      Bar: number;
      Baz() {}
  }

  // ✅ Good
  class Foo {
      bar: number;
      baz() {}
  }
  ```

### インターフェース

* インターフェース名は **PascalCase**。接頭辞 **I** は付けない。

  ```ts
  // ❌ Bad
  interface IFoo {}

  // ✅ Good
  interface Foo {}
  ```

### 型エイリアス

* 型エイリアス名は **PascalCase**。メンバは **camelCase**。

  ```ts
  type HttpMethod = 'GET' | 'POST';
  ```

### 名前空間

* 名前は **PascalCase**。

  ```ts
  namespace Utility {}
  ```

### Enum

* Enum 名・メンバ名ともに **PascalCase**。

  ```ts
  // ❌ Bad
  enum color { red }

  // ✅ Good
  enum Color { Red, Green }
  ```

---

## 型安全

### null と undefined

* 明示的に使わず、**オプショナルプロパティ** か **Union** を使う。

  ```ts
  // ❌ Bad
  let point = { x: 10, y: undefined };

  // ✅ Good
  type Point = { x: number; y?: number };
  const point: Point = { x: 10 };
  ```
* API 互換性のために **null** を返さざるを得ない場合のみ `null` を使う。

### 厳格比較

* 基本的に `=== / !==` を使用する。`== null` は null/undefined 同時判定にのみ許可する。

### type vs interface

* **Union / Intersection** を表したいときは **type**。
* 継承・実装を行いたいときは **interface**。

  ```ts
  type Foo = number | { someProperty: number };

  interface FooLike {
    foo: string;
  }

  interface FooBar extends FooLike {
      bar: string;
  }

  class X implements FooBar {
      foo = 'hello';
      bar = 'world';
  }
  ```

---

## コードフォーマット

| 項目      | 推奨                  |
| ------- | ------------------- |
| 引用符     | **' シングルクォート**      |
| インデント   | **2 スペース**（タブ禁止）    |
| セミコロン   | **必須**              |
| 配列型     | `Foo[]` 記法          |
| 型注釈スペース | `const foo: string` |

フォーマッタは **tsfmt** または **Prettier** を使用し、CI で自動検証する。

---

## ファイル構成

* ファイル名は **camelCase** (`myComponent.tsx`, `utils.ts`) とする。
* 1 ファイル 1 コンポーネント（または 1 モジュール）を原則とし、テストは `*.spec.ts` または `*.test.ts`。

---

## セキュリティベストプラクティス

| カテゴリ                    | ガイドライン                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **Compiler Options**    | `strict`, `noImplicitAny`, `noUncheckedIndexedAccess` を有効にして型安全性を高める。              |
| **依存関係**                | `npm audit`, `npm outdated` を CI で実行し、脆弱パッケージを早期検知する。                              |
| **入力バリデーション**           | フロントエンドでは DOMPurify 等で XSS を防ぎ、バックエンドでは class‑validator/zod でスキーマ検証を行う。            |
| **eval / new Function** | 使用禁止。動的 import も信頼済みパスのみ許可する。                                                      |
| **CSP**                 | Web アプリは **Content‑Security‑Policy** を適切に設定し、`script-src 'self'` を基本とする。           |
| **Secrets 管理**          | API キー・認証情報は `.env` に置き、リポジトリにコミットしない。                                             |
| **型による防御**              | `unknown` 型を使って外部入力を受け取り、ナローイングしてから使用する。                                           |
| **サードパーティ API**         | 返却値をカスタム型でラップし、想定外のプロパティを拒否する。                                                     |
| **CI / CD**             | `eslint --max-warnings 0` と `tsc --noEmit` をパイプラインに組み込み、型エラーや lint エラーをデプロイ前に遮断する。 |

---

## 補足・推奨ツール

* **ESLint**: `@typescript-eslint` ルールセットで静的解析を実施する。
* **Prettier**: フォーマッタとして導入し、`prettier --check` を CI で実行する。
* **husky & lint-staged**: コミット前フックで `eslint` と `prettier` を実行し、質の低いコード流入を防止する。
* **Dependabot / Renovate**: 依存ライブラリの自動アップデートを行う。
* **Playwright / Vitest**: エンドツーエンドおよびユニットテストで回帰を検知する。

---

## まとめ

本ガイドは **一貫性** と **安全性** を両立させるための最低限の基盤である。
