import { Token } from ".";
import { AbstractSyntaxTree } from "./AbstractSyntaxTree";

export interface IParser {
    parse(tokens: Array<Token>): AbstractSyntaxTree;
}
