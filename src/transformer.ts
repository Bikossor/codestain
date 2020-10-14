import { NodeType } from "./enums/NodeType";
import { AbstractSyntaxTree } from "./Interfaces/AbstractSyntaxTree";

function transformer(ast: AbstractSyntaxTree) {
    let current = 0;
    let transformed: Array<string> = [];

    transformed.push(
        `<div style="color:#fff">`
    );

    const nodes = ast.body;

    while (current < nodes.length) {
        const node = nodes[current];

        switch (node.type) {
            case NodeType.Identifier:
                transformed.push(
                    `<span style="color:#4FC1FF">${node.value}</span>`
                );

                current++;
                break;
            case NodeType.Keyword:
                transformed.push(
                    `<span style="color:#499cd5">${node.value}</span>`
                );

                current++;
                break;
            case NodeType.StringLiteral:
                transformed.push(
                    `<span style="color:#ce9178">"${node.value}"</span>`
                );

                current++;
                break;
            case NodeType.NumberLiteral:
                transformed.push(
                    `<span style="color:#b5cea8">${node.value}</span>`
                );

                current++;
                break;
            default:
                transformed.push(
                    node.value
                );

                current++;
                break;
        }
    }

    transformed.push(
        `</div>`
    );

    return transformed;
}

export {
    transformer,
};
