import { NodeType } from "./NodeType";

export interface Node {
    type: NodeType;
    value?: string;
    name?: string;
    params?: Array<Node>;
}
