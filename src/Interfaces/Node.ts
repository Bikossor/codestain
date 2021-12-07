import { NodeType } from "../enums";

export interface Node {
  type: NodeType;
  value?: string;
  name?: string;
  params?: Array<Node>;
}
