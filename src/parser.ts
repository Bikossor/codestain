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

        if (token.type === TokenType.Boolean) {
            current++;

            return {
                type: 'BooleanLiteral',
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
            const identifier = tokens[current];

            // Identifier of a CallExpression
            if (tokens[++current].type === TokenType.ParenthesisLeft) {
                token = tokens[++current];

                let node = {
                    type: 'CallExpression',
                    name: identifier.value,
                    params: [],
                };

                if (token.type === TokenType.ParenthesisRight) {
                    current++;
                    return node;
                }

                while (token.type !== TokenType.ParenthesisRight) {
                    node.params.push(walk());
                    token = tokens[current];
                }

                current++;

                return node;
            }

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
            token.type === TokenType.Semicolon ||
            token.type === TokenType.Comma) {
            current++;

            return {
                type: 'Separator',
                value: token.value,
            };
        }

        if (token.type === TokenType.ParenthesisLeft) {

            token = tokens[++current];

            let node = {
                type: 'CallExpression',
                name: null,
                params: [],
            };

            if (token.type === TokenType.ParenthesisRight) {
                current++;
                return node;
            }

            while (token.type !== TokenType.ParenthesisRight) {
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
