import { IParser } from "../Interfaces";
import { JavaScriptParser } from "../parser";
import { InputLanguage } from "../types";

export const createParser = (language: InputLanguage): IParser => {
    switch (language) {
        case "JavaScript":
            return new JavaScriptParser();
        default:
            throw new Error("InputLanguage not supported!");
    }
};
