const { tokenizer } = require('./dist/tokenizer');
const { parser } = require('./dist/parser');

const example = `const sayHello`;

console.log(
    parser(
        tokenizer(example)
    )
);
