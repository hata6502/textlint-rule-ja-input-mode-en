import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("ja-input-mode-en", rule, {
  invalid: [
    {
      text: "あっｐぇ、ｓまｒｔｐほね、れこｒでｒ、ゔぃｃとｒｙ",
      errors: [
        {
          message: "日本語モードのまま入力された英単語: あっｐぇ → Apple",
          line: 1,
          column: 1,
          fix: {
            range: [0, 4],
            text: "Apple",
          },
        },
        {
          message: "日本語モードのまま入力された英単語: あっｐぇ → apple",
          line: 1,
          column: 1,
          fix: {
            range: [0, 4],
            text: "apple",
          },
        },
        {
          message:
            "日本語モードのまま入力された英単語: ｓまｒｔｐほね → smartphone",
          line: 1,
          column: 6,
          fix: {
            range: [5, 12],
            text: "smartphone",
          },
        },
        {
          message: "日本語モードのまま入力された英単語: れこｒでｒ → recorder",
          line: 1,
          column: 14,
          fix: {
            range: [13, 18],
            text: "recorder",
          },
        },
        {
          message: "日本語モードのまま入力された英単語: ゔぃｃとｒｙ → victory",
          line: 1,
          column: 20,
          fix: {
            range: [19, 25],
            text: "victory",
          },
        },
      ],
    },
  ],
  valid: ["あい、いお、いこか"],
});
