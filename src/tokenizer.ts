function tokenizer(input: string) {
    let current = 0;
    let tokens: Array<Token> = [];

    while (current < input.length) {
        let char = input[current];

        if (char === '(') {
            tokens.push({
                type: 'paren',
                value: '(',
            });

            current++;
            continue;
        }

        if (char === ')') {
            tokens.push({
                type: 'paren',
                value: ')',
            });

            current++;
            continue;
        }

        if (char === '=') {
            tokens.push({
                type: 'equals',
                value: '=',
            });

            current++;
            continue;
        }

        if (char === ';') {
            tokens.push({
                type: 'semicolon',
                value: ';',
            });

            current++;
            continue;
        }

        if (char === '>') {
            tokens.push({
                type: 'greater-than',
                value: '>',
            });

            current++;
            continue;
        }

        if (char === '.') {
            tokens.push({
                type: 'dot',
                value: '.',
            });

            current++;
            continue;
        }

        const WHITESPACE = /\s/;

        if (WHITESPACE.test(char)) {
            tokens.push({
                type: 'whitespace',
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
                type: 'number',
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
                type: 'string',
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

            tokens.push({
                type: 'name',
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
