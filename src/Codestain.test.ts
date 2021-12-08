import { NodeType, TokenType } from "./enums";
import { createParser } from "./factories";
import { AbstractSyntaxTree, Token } from "./Interfaces";
import { tokenizer } from "./tokenizer";

const input = `const sayHello = () => console.log("Hello World!");`;

const expectedTokens: Token[] = [
  { type: TokenType.Name, value: "const" },
  { type: TokenType.Whitespace, value: " " },
  { type: TokenType.Name, value: "sayHello" },
  { type: TokenType.Whitespace, value: " " },
  { type: TokenType.Equals, value: "=" },
  { type: TokenType.Whitespace, value: " " },
  { type: TokenType.ParenthesisLeft, value: "(" },
  { type: TokenType.ParenthesisRight, value: ")" },
  { type: TokenType.Whitespace, value: " " },
  { type: TokenType.Equals, value: "=" },
  { type: TokenType.GreaterThan, value: ">" },
  { type: TokenType.Whitespace, value: " " },
  { type: TokenType.Name, value: "console" },
  { type: TokenType.Dot, value: "." },
  { type: TokenType.Name, value: "log" },
  { type: TokenType.ParenthesisLeft, value: "(" },
  { type: TokenType.String, value: "Hello World!" },
  { type: TokenType.ParenthesisRight, value: ")" },
  { type: TokenType.Semicolon, value: ";" },
];

test("if tokens are as expected", () => {
  const actualTokens = tokenizer(input);

  expect(actualTokens).toStrictEqual(expectedTokens);
});

test("if ast is as expected", () => {
  const expectedAst: AbstractSyntaxTree = {
    type: "Program",
    body: [
      {
        type: NodeType.Keyword,
        value: "const",
      },
      {
        type: NodeType.Whitespace,
        value: " ",
      },
      {
        type: NodeType.Identifier,
        value: "sayHello",
      },
      {
        type: NodeType.Whitespace,
        value: " ",
      },
      {
        type: NodeType.Operator,
        value: "=",
      },
      {
        type: NodeType.Whitespace,
        value: " ",
      },
      {
        type: NodeType.CallExpression,
        name: null,
        params: [],
      },
      {
        type: NodeType.Whitespace,
        value: " ",
      },
      {
        type: NodeType.Operator,
        value: "=",
      },
      {
        type: NodeType.Operator,
        value: ">",
      },
      {
        type: NodeType.Whitespace,
        value: " ",
      },
      {
        type: NodeType.Identifier,
        value: "console",
      },
      {
        type: NodeType.Separator,
        value: ".",
      },
      {
        type: NodeType.CallExpression,
        name: "log",
        params: [
          {
            type: NodeType.StringLiteral,
            value: "Hello World!",
          },
        ],
      },
      {
        type: NodeType.Separator,
        value: ";",
      },
    ],
  };

  const actualTokens = tokenizer(input);
  const javaScriptParser = createParser("JavaScript");
  const actualAst = javaScriptParser.parse(actualTokens);

  expect(actualAst).toStrictEqual(expectedAst);
});
