import { NodeType } from "../enums";

export interface ITransformer {
  transform(ast: Array<[NodeType, string]>): string;
}
