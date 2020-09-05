const { tokenizer } = require('./dist/tokenizer');

const example = `const sayHello = () => console.log("Hello World!");`;

console.log(
    tokenizer(example)
);
