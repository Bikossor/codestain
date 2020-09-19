const assert = require('assert');
const { parser } = require('../dist/parser');
const { tokenizer } = require('../dist/tokenizer');

const input = `const sayHello = () => console.log("Hello World!");`;

const expectedTokens = [
    { type: 'keyword', value: 'const' },
    { type: 'whitespace', value: ' ' },
    { type: 'name', value: 'sayHello' },
    { type: 'whitespace', value: ' ' },
    { type: 'equals', value: '=' },
    { type: 'whitespace', value: ' ' },
    { type: 'paren-left', value: '(' },
    { type: 'paren-right', value: ')' },
    { type: 'whitespace', value: ' ' },
    { type: 'equals', value: '=' },
    { type: 'greater-than', value: '>' },
    { type: 'whitespace', value: ' ' },
    { type: 'name', value: 'console' },
    { type: 'dot', value: '.' },
    { type: 'name', value: 'log' },
    { type: 'paren-left', value: '(' },
    { type: 'string', value: 'Hello World!' },
    { type: 'paren-right', value: ')' },
    { type: 'semicolon', value: ';' }
];

const actualTokens = tokenizer(input);

assert.deepStrictEqual(actualTokens, expectedTokens);

const expectedAst = {
    type: "Program",
    body: [
        {
            type: "Keyword",
            value: "const"
        },
        {
            type: "Whitespace",
            value: " "
        },
        {
            type: "Identifier",
            value: "sayHello"
        },
        {
            type: "Whitespace",
            value: " "
        },
        {
            type: "Operator",
            value: "="
        },
        {
            type: "Whitespace",
            value: " "
        },
        {
            type: "CallExpression",
            name: null,
            params: []
        },
        {
            type: "Whitespace",
            value: " "
        },
        {
            type: "Operator",
            value: "="
        },
        {
            type: "Operator",
            value: ">"
        },
        {
            type: "Whitespace",
            value: " "
        },
        {
            type: "Identifier",
            value: "console"
        },
        {
            type: "Separator",
            value: "."
        },
        {
            type: "CallExpression",
            name: "log",
            params: [
                {
                    type: "StringLiteral",
                    value: "Hello World!"
                }
            ]
        },
        {
            type: "Separator",
            value: ";"
        }
    ]
};

const actualAst = parser(actualTokens);

assert.deepStrictEqual(actualAst, expectedAst);

console.log('All tests passed!');
