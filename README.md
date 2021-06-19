# textlint-rule-ja-input-mode-en

日本語モードのまま入力された英単語を検出する textlint ルール。
自動修正にも対応しています。

```bash
  4:3 ✓ error 日本語モードのまま入力された英単語: ｓまｒｔｐほね → smartphone ja-input-mode-en
```

以下のように、不自然なアルファベットが含まれる入力ミスを検出します。

- あっｐぇ → apple
- ｓまｒｔｐほね → smartphone
- れこｒでｒ → recorder

以下のように、不自然なアルファベットを含まない入力ミスは検出**しません**。

- あい → AI
- いお → IO (アイオー、入出力)
- いこか → icoca（交通系電子マネー）

## Install

Install with [npm](https://www.npmjs.com/):

```bash
npm install textlint-rule-ja-input-mode-en
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "ja-input-mode-en": true
  }
}
```

Via CLI

```bash
textlint --rule ja-input-mode-en README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

```bash
npm run build
```

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

```bash
npm test
```

## License

MIT © Tomoyuki Hata

## Disclaimer

The following creations are included in this product:

- [dictionary-en](https://github.com/wooorm/dictionaries/blob/main/dictionaries/en/license)
- [textlint-ja/textlint-rule-ja-unnatural-alphabet](https://github.com/textlint-ja/textlint-rule-ja-unnatural-alphabet/blob/master/LICENSE)
  - > (3) 不自然なアルファベット
  - 1 文字のみのアルファベットが日本語中に現れた場合に検出対象とする
  - 大文字は、略記号などを意識して入れている可能性がある
  - このミスでは母音(`aiueo`)は発生しないので除く
  - `n`も多くの場合には、`ん`となるため除く
  - [CiNii 論文 - 日本語文章校正ツール"Chanterelle" : 入力ミス及び表記揺らぎについて](http://ci.nii.ac.jp/naid/110002893543)より
