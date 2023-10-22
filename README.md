## react-gantt の動かし方

### 手順 1：pnpm を導入

ターミナルを開き、以下のコマンドのいずれかを打ち込みます。

macの場合<br />
`brew install pnpm`<br />
windowsの場合<br />
`iwr https://get.pnpm.io/install.ps1 -useb | iex`<br />
npmを使ってインストールする場合<br />
`npm install -g pnpm`<br />

### 手順 2：Node.jsのバージョンを確認する
`node -v`でnodeのバージョンを確認し、nodeのバージョンが`17.0.0`以上の場合、16系以下に設定し直してください。

例（`nodenv`を使用している場合）
```
nodenv install 16.0.0
nodenv local 16.0.0
nodenv rehash
```

### 手順 3：接続する
`pnpm run start:website`でサーバーを立ち上げ、以下のURLから動作検証を行ってください。

`http://localhost:8000/#/en-US/component`
