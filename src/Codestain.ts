import { InputLanguage } from "./types";

import { tokenizer } from "./tokenizer";
import { JavaScriptParser } from "./parser";
import { transformer } from "./transformer";

export const Codestain = (language: InputLanguage, input: string) => {
    switch (language) {
        case "JavaScript":
            const tokens = tokenizer(input);
            const ast = JavaScriptParser(tokens);
            return transformer(ast).join('');
        default:
            throw new Error(`InputLanguage "${language}" not supported!`);
    }
};
