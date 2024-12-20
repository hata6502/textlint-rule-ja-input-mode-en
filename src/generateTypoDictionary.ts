import { toHiragana } from "@koozaki/romaji-conv";
import { readFileSync, writeFileSync } from "fs";
import moji from "moji";

const enDictionaryPath = require.resolve("dictionary-en/index.dic");

const typoDictionary = readFileSync(enDictionaryPath, "utf-8")
  // ファイル末端の改行を除去する。
  .trim()
  .split("\n")
  // ファイル先頭に書かれた単語数を除去する。
  .slice(1)
  // 「/」のあとに続くフラグを除去する。
  .map((line) => line.split("/")[0])
  .flatMap((correct) => {
    const word = moji(toHiragana(correct)).convert("HE", "ZE").toString();

    // 不自然なアルファベットが含まれているかチェックする。
    return /[ぁ-んー][ａ-ｚＡ-Ｚ]+[ぁ-んー]/.test(word)
      ? [
          {
            correct,
            word,
          },
        ]
      : [];
  });

writeFileSync(
  "src/typoDictionary.json",
  JSON.stringify(typoDictionary, null, 2)
);
