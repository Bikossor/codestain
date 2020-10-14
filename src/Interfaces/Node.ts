import { NodeType } from "../enums/NodeType";

export interface Node {
    type: NodeType;
    value?: string;
    name?: string;
    params?: Array<Node>;
}
