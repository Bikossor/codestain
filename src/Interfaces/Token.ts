import { TokenType } from "../enums/TokenType";

export interface Token {
    type: TokenType;
    value: string;
}
