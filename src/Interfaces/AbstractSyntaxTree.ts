import { Node } from "./Node";

export interface AbstractSyntaxTree {
    type: string;
    body: Array<Node>;
}
