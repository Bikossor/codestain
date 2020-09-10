import { Token } from "./Interfaces/Token";
import { TokenType } from "./Interfaces/TokenType";

function tokenizer(input: string) {
    let current = 0;
    let tokens: Array<Token> = [];

    while (current < input.length) {
        let char = input[current];

        if (char === '(') {
            tokens.push({
                type: TokenType.ParenthesisLeft,
                value: '(',
            });

            current++;
            continue;
        }

        if (char === ')') {
            tokens.push({
                type: TokenType.ParenthesisRight,
                value: ')',
            });

            current++;
            continue;
        }

        if (char === '=') {
            tokens.push({
                type: TokenType.Equals,
                value: '=',
            });

            current++;
            continue;
        }

        if (char === ';') {
            tokens.push({
                type: TokenType.Semicolon,
                value: ';',
            });

            current++;
            continue;
        }

        if (char === '>') {
            tokens.push({
                type: TokenType.GreaterThan,
                value: '>',
            });

            current++;
            continue;
        }

        if (char === '.') {
            tokens.push({
                type: TokenType.Dot,
                value: '.',
            });

            current++;
            continue;
        }

        const WHITESPACE = /\s/;

        if (WHITESPACE.test(char)) {
            tokens.push({
                type: TokenType.Whitespace,
                value: char,
            });

            current++;
            continue;
        }

        const NUMBER = /[0-9]/;

        if (NUMBER.test(char)) {
            let value = '';

            do {
                value += char;
                char = input[++current];
            } while (NUMBER.test(char))

            tokens.push({
                type: TokenType.Number,
                value
            });

            continue;
        }

        if (char === '"') {
            let value = '';
            char = input[++current];

            do {
                value += char;
                char = input[++current];
            } while (char !== '"')

            char = input[++current];
            tokens.push({
                type: TokenType.String,
                value
            });

            continue;
        }

        const LETTER = /[a-z]/i;

        if (LETTER.test(char)) {
            let value = '';

            do {
                value += char;
                char = input[++current];
            } while (LETTER.test(char))

            const KEYWORDS = /break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield/;

            tokens.push({
                type: KEYWORDS.test(value)
                    ? TokenType.Keyword
                    : TokenType.Name,
                value
            });

            continue;
        }
        throw new TypeError(`Unknown character: "${char}"`);
    }
    return tokens;
}

export {
    tokenizer,
};
