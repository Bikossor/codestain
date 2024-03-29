import { Token } from "./Interfaces";
import { TokenType } from "./enums";

function tokenizer(input: string) {
  let current = 0;
  let tokens: Array<Token> = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: TokenType.ParenthesisLeft,
        value: "(",
      });

      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenType.ParenthesisRight,
        value: ")",
      });

      current++;
      continue;
    }

    if (char === "{") {
      tokens.push({
        type: TokenType.BraceLeft,
        value: "{",
      });

      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({
        type: TokenType.BraceRight,
        value: "}",
      });

      current++;
      continue;
    }

    if (char === "[") {
      tokens.push({
        type: TokenType.BracketLeft,
        value: "[",
      });

      current++;
      continue;
    }

    if (char === "]") {
      tokens.push({
        type: TokenType.BracketRight,
        value: "]",
      });

      current++;
      continue;
    }

    if (char === "=") {
      tokens.push({
        type: TokenType.Equals,
        value: "=",
      });

      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({
        type: TokenType.Comma,
        value: ",",
      });

      current++;
      continue;
    }

    if (char === ";") {
      tokens.push({
        type: TokenType.Semicolon,
        value: ";",
      });

      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({
        type: TokenType.Colon,
        value: ":",
      });

      current++;
      continue;
    }

    if (char === "<") {
      tokens.push({
        type: TokenType.LessThan,
        value: "<",
      });

      current++;
      continue;
    }

    if (char === ">") {
      tokens.push({
        type: TokenType.GreaterThan,
        value: ">",
      });

      current++;
      continue;
    }

    // Test for slashes in general
    if (char === "/") {
      let regexValue = "";
      char = input[++current];

      // If the next character is another "/" that means that this guy is an inline comment
      if (char === "/") {
        let commentValue = "";
        char = input[++current];

        while (char !== "\n") {
          commentValue += char;
          char = input[++current];
        }

        tokens.push({
          type: TokenType.InlineComment,
          value: `//${commentValue}`,
        });

        continue;
      }

      while (char !== "/") {
        regexValue += char;
        char = input[++current];
      }

      char = input[++current];
      tokens.push({
        type: TokenType.Regex,
        value: `/${regexValue}/`,
      });

      continue;
    }

    if (char === "/") {
      tokens.push({
        type: TokenType.Slash,
        value: "/",
      });

      current++;
      continue;
    }

    if (char === "\\") {
      tokens.push({
        type: TokenType.Backslash,
        value: "\\",
      });

      current++;
      continue;
    }

    if (char === "+") {
      tokens.push({
        type: TokenType.Plus,
        value: "+",
      });

      current++;
      continue;
    }

    if (char === "-") {
      tokens.push({
        type: TokenType.Minus,
        value: "-",
      });

      current++;
      continue;
    }

    if (char === "%") {
      tokens.push({
        type: TokenType.Percent,
        value: "%",
      });

      current++;
      continue;
    }

    if (char === "*") {
      tokens.push({
        type: TokenType.Asterisk,
        value: "*",
      });

      current++;
      continue;
    }

    if (char === "!") {
      tokens.push({
        type: TokenType.ExclamationMark,
        value: "!",
      });

      current++;
      continue;
    }

    if (char === "?") {
      tokens.push({
        type: TokenType.QuestionMark,
        value: "?",
      });

      current++;
      continue;
    }

    if (char === "$") {
      tokens.push({
        type: TokenType.Dollar,
        value: "$",
      });

      current++;
      continue;
    }

    if (char === "&") {
      tokens.push({
        type: TokenType.Ampersand,
        value: "&",
      });

      current++;
      continue;
    }

    if (char === "`") {
      tokens.push({
        type: TokenType.Backtick,
        value: "`",
      });

      current++;
      continue;
    }

    if (char === ".") {
      tokens.push({
        type: TokenType.Dot,
        value: ".",
      });

      current++;
      continue;
    }

    const WHITESPACE = /\s/;

    if (WHITESPACE.test(char)) {
      tokens.push({
        type: TokenType.Whitespace,
        value: char,
      });

      current++;
      continue;
    }

    const NUMBER = /[0-9]/;

    if (NUMBER.test(char)) {
      let value = "";

      do {
        value += char;
        char = input[++current];
      } while (NUMBER.test(char));

      tokens.push({
        type: TokenType.Number,
        value,
      });

      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];

      do {
        value += char;
        char = input[++current];
      } while (char !== '"');

      char = input[++current];
      tokens.push({
        type: TokenType.String,
        value,
      });

      continue;
    }

    if (char === "'") {
      let value = "";
      char = input[++current];

      do {
        value += char;
        char = input[++current];
      } while (char !== "'");

      char = input[++current];
      tokens.push({
        type: TokenType.String,
        value,
      });

      continue;
    }

    if (char === "#") {
      tokens.push({
        type: TokenType.Hash,
        value: "#",
      });

      current++;
      continue;
    }

    const LETTER = /[a-z]/i;

    if (LETTER.test(char)) {
      // TODO (al): Can every name in every language start with a character?
      let value = "";

      do {
        value += char;
        char = input[++current];
      } while (char && (LETTER.test(char) || NUMBER.test(char)));

      tokens.push({
        type: TokenType.Name,
        value,
      });

      continue;
    }
    throw new TypeError(`Unknown character: "${char}"`);
  }
  return tokens;
}

export { tokenizer };
