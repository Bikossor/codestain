import { TokenType } from "../enums";

export interface Token {
    type: TokenType;
    value: string;
}
