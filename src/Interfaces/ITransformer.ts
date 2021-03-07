import { AbstractSyntaxTree } from ".";

export interface ITransformer {
    transform(ast: AbstractSyntaxTree): string;
}
