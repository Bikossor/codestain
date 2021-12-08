import { createParser } from "./factories";
import { tokenizer } from "./tokenizer";

const input = `const sayHello = () => console.log("Hello World!");`;

const expectedTokens = [
  { type: "name", value: "const" },
  { type: "whitespace", value: " " },
  { type: "name", value: "sayHello" },
  { type: "whitespace", value: " " },
  { type: "equals", value: "=" },
  { type: "whitespace", value: " " },
  { type: "paren-left", value: "(" },
  { type: "paren-right", value: ")" },
  { type: "whitespace", value: " " },
  { type: "equals", value: "=" },
  { type: "greater-than", value: ">" },
  { type: "whitespace", value: " " },
  { type: "name", value: "console" },
  { type: "dot", value: "." },
  { type: "name", value: "log" },
  { type: "paren-left", value: "(" },
  { type: "string", value: "Hello World!" },
  { type: "paren-right", value: ")" },
  { type: "semicolon", value: ";" },
];

test("if tokens are as expected", () => {
  const actualTokens = tokenizer(input);

  expect(actualTokens).toStrictEqual(expectedTokens);
});

test("if ast is as expected", () => {
  const expectedAst = {
    type: "Program",
    body: [
      {
        type: "keyword",
        value: "const",
      },
      {
        type: "whitespace",
        value: " ",
      },
      {
        type: "identifier",
        value: "sayHello",
      },
      {
        type: "whitespace",
        value: " ",
      },
      {
        type: "operator",
        value: "=",
      },
      {
        type: "whitespace",
        value: " ",
      },
      {
        type: "call-expression",
        name: null,
        params: [],
      },
      {
        type: "whitespace",
        value: " ",
      },
      {
        type: "operator",
        value: "=",
      },
      {
        type: "operator",
        value: ">",
      },
      {
        type: "whitespace",
        value: " ",
      },
      {
        type: "identifier",
        value: "console",
      },
      {
        type: "separator",
        value: ".",
      },
      {
        type: "call-expression",
        name: "log",
        params: [
          {
            type: "string-literal",
            value: "Hello World!",
          },
        ],
      },
      {
        type: "separator",
        value: ";",
      },
    ],
  };

  const actualTokens = tokenizer(input);
  const javaScriptParser = createParser("JavaScript");
  const actualAst = javaScriptParser.parse(actualTokens);

  expect(actualAst).toStrictEqual(expectedAst);
});
