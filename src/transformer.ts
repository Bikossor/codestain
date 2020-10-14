import { Token } from "./Interfaces/Token";
import { TokenType } from "./enums/TokenType";

function transformer(tokens: Array<Token>) {
    let current = 0;
    let transformed = [];

    transformed.push(
        `<div style="color:#fff">`
    );

    while (current < tokens.length) {
        let token = tokens[current];

        switch (token.type) {
            case TokenType.Name:
                transformed.push(
                    `<span style="color:#4FC1FF">${token.value}</span>`
                );

                current++;
                break;
            case TokenType.Keyword:
                transformed.push(
                    `<span style="color:#499cd5">${token.value}</span>`
                );

                current++;
                break;
            case TokenType.String:
                transformed.push(
                    `<span style="color:#ce9178">"${token.value}"</span>`
                );

                current++;
                break;
            case TokenType.Number:
                transformed.push(
                    `<span style="color:#b5cea8">${token.value}</span>`
                )
                current++;
                break;
            default:
                transformed.push(
                    token.value
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
