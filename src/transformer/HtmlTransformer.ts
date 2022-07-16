import { NodeType } from "../enums";
import { ITransformer } from "../Interfaces";

export class HtmlTransformer implements ITransformer {
  transform(ast: Array<[NodeType, string]>): string {
    return ast
      .map(([type, value]) => {
        switch (type) {
          case NodeType.Identifier:
            return `<span style="color:#4FC1FF">${value}</span>`;
          case NodeType.Keyword:
            return `<span style="color:#499cd5">${value}</span>`;
          case NodeType.StringLiteral:
            return `<span style="color:#ce9178">"${value}"</span>`;
          case NodeType.NumberLiteral:
            return `<span style="color:#b5cea8">${value}</span>`;
          case NodeType.Separator:
            return `<span style="color:lime">${value}</span>`;
          case NodeType.Regex:
            return `<span style="color:red">${value}</span>`;
          case NodeType.InlineComment:
            return `<span style="color:grey">${value}</span>`;
          default:
            return value;
        }
      })
      .join("");
  }
}
