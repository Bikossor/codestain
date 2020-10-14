import { AbstractSyntaxTree } from "./Interfaces/AbstractSyntaxTree";
import { Node } from "./Interfaces/Node";
import { NodeType } from "./Interfaces/NodeType";
import { Token } from "./Interfaces/Token";
import { TokenType } from "./Interfaces/TokenType";

function parser(tokens: Array<Token>) {

    let current = 0;

    function walk(): Node {

        let token = tokens[current];

        if (token.type === TokenType.Number) {

            current++;

            return {
                type: NodeType.NumberLiteral,
                value: token.value,
            };
        }

        if (token.type === TokenType.String) {
            current++;

            return {
                type: NodeType.StringLiteral,
                value: token.value,
            };
        }

        if (token.type === TokenType.Boolean) {
            current++;

            return {
                type: NodeType.BooleanLiteral,
                value: token.value,
            };
        }

        if (token.type === TokenType.Keyword) {
            current++;

            return {
                type: NodeType.Keyword,
                value: token.value,
            };
        }

        if (token.type === TokenType.Whitespace) {
            current++;

            return {
                type: NodeType.Whitespace,
                value: token.value,
            };
        }

        if (token.type === TokenType.Name) {
            const identifier = tokens[current];
            const nextToken = tokens[++current];

            // Identifier of a CallExpression
            if (nextToken && nextToken.type === TokenType.ParenthesisLeft) {
                token = tokens[++current];

                let node = {
                    type: NodeType.CallExpression,
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
                type: NodeType.Identifier,
                value: token.value,
            };
        }

        if (token.type === TokenType.Equals ||
            token.type === TokenType.GreaterThan) {
            current++;

            return {
                type: NodeType.Operator,
                value: token.value,
            };
        }

        if (token.type === TokenType.Dot ||
            token.type === TokenType.Semicolon ||
            token.type === TokenType.Comma) {
            current++;

            return {
                type: NodeType.Separator,
                value: token.value,
            };
        }

        if (token.type === TokenType.ParenthesisLeft) {

            token = tokens[++current];

            let node = {
                type: NodeType.CallExpression,
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

    let ast: AbstractSyntaxTree = {
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
