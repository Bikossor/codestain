const assert = require('assert');
const { createParser } = require('../dist/factories');
const { tokenizer } = require('../dist/tokenizer');

const input = `const sayHello = () => console.log("Hello World!");`;

const expectedTokens = [
    { type: 'name', value: 'const' },
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
            type: "keyword",
            value: "const"
        },
        {
            type: "whitespace",
            value: " "
        },
        {
            type: "identifier",
            value: "sayHello"
        },
        {
            type: "whitespace",
            value: " "
        },
        {
            type: "operator",
            value: "="
        },
        {
            type: "whitespace",
            value: " "
        },
        {
            type: "call-expression",
            name: null,
            params: []
        },
        {
            type: "whitespace",
            value: " "
        },
        {
            type: "operator",
            value: "="
        },
        {
            type: "operator",
            value: ">"
        },
        {
            type: "whitespace",
            value: " "
        },
        {
            type: "identifier",
            value: "console"
        },
        {
            type: "separator",
            value: "."
        },
        {
            type: "call-expression",
            name: "log",
            params: [
                {
                    type: "string-literal",
                    value: "Hello World!"
                }
            ]
        },
        {
            type: "separator",
            value: ";"
        }
    ]
};

const javaScriptParser = createParser("JavaScript");
const actualAst = javaScriptParser.parse(actualTokens);

assert.deepStrictEqual(actualAst, expectedAst);

console.log('All tests passed!');
