import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("ja-input-mode-en", rule, {
  invalid: [
    {
      text: "あっｐぇ、ｓまｒｔｐほね、れこｒでｒ",
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
      ],
    },
  ],
  valid: ["あい、いお、いこか"],
});
