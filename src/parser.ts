import { Token } from "./Interfaces/Token";
import { TokenType } from "./Interfaces/TokenType";

function parser(tokens: Array<Token>) {

    let current = 0;

    function walk() {

        let token = tokens[current];

        if (token.type === TokenType.Number) {

            current++;

            return {
                type: 'NumberLiteral',
                value: token.value,
            };
        }

        if (token.type === TokenType.String) {
            current++;

            return {
                type: 'StringLiteral',
                value: token.value,
            };
        }

        if (token.type === TokenType.Keyword) {
            current++;

            return {
                type: 'Keyword',
                value: token.value,
            };
        }

        if (token.type === TokenType.Whitespace) {
            current++;

            return {
                type: 'Whitespace',
                value: token.value,
            };
        }

        if (token.type === TokenType.Name) {
            current++;

            return {
                type: 'Identifier',
                value: token.value,
            };
        }

        if (token.type === TokenType.Equals ||
            token.type === TokenType.GreaterThan) {
            current++;

            return {
                type: 'Operator',
                value: token.value,
            };
        }

        if (token.type === TokenType.Dot ||
            token.type === TokenType.Semicolon) {
            current++;

            return {
                type: 'Separator',
                value: token.value,
            };
        }

        if (
            token.type === TokenType.Parenthesis &&
            token.value === '('
        ) {

            token = tokens[++current];

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };

            // TODO: Returns only the ending paren as the name
            if (token.type === TokenType.Parenthesis && token.value === ')') {
                current++;
                return node;
            }

            // token = tokens[++current];

            while (
                (token.type !== TokenType.Parenthesis) ||
                (token.type === TokenType.Parenthesis && token.value !== ')')
            ) {
                node.params.push(walk());
                token = tokens[current];
            }

            current++;

            return node;
        }

        throw new TypeError(token.type);
    }

    let ast = {
        type: 'Program',
        body: [],
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}

export {
    parser,
}
