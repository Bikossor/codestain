const assert = require('assert');
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

assert.deepStrictEqual(tokenizer(input), expectedTokens);

console.log('All tests passed!');
