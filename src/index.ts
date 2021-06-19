import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import typoDictionary from "./typoDictionary.json";

const reporter: TextlintRuleReporter = (context) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);

      const ruleErrors = typoDictionary.flatMap((typoData) => {
        const index = text.indexOf(typoData.word);

        if (index === -1) {
          return [];
        }

        return [
          new RuleError(
            `日本語モードのまま入力された英単語: ${typoData.word} → ${typoData.correct}`,
            {
              index,
              fix: fixer.replaceTextRange(
                [index, index + typoData.word.length],
                typoData.correct
              ),
            }
          ),
        ];
      });

      ruleErrors.forEach((ruleError) => {
        if (
          ruleErrors.some((otherRuleError) => {
            if (!ruleError.fix || !otherRuleError.fix) {
              throw new Error();
            }

            return (
              ruleError.index === otherRuleError.index &&
              ruleError.fix.range[1] < otherRuleError.fix.range[1]
            );
          })
        ) {
          return;
        }

        report(node, ruleError);
      });
    },
  };
};

const textlintRuleModule: TextlintRuleModule = {
  fixer: reporter,
  linter: reporter,
};

export default textlintRuleModule;
