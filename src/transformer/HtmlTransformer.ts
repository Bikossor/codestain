import { NodeType } from "../enums";
import { AbstractSyntaxTree, Node, ITransformer } from "../Interfaces";

export class HtmlTransformer implements ITransformer {
  transform(ast: AbstractSyntaxTree): string {
    let current = 0;
    let transformed: Array<string> = [];

    transformed.push(
      `<pre style="color:#fff; background: #1e1e1e; padding: 2rem; font-family: Consolas, Monospace;">`,
    );

    const nodes = ast.body;

    function walk(paramNode?: Node) {
      const node = paramNode == null ? nodes[current++] : paramNode;

      switch (node.type) {
        case NodeType.Identifier:
          return `<span style="color:#4FC1FF">${node.value}</span>`;
        case NodeType.Keyword:
          return `<span style="color:#499cd5">${node.value}</span>`;
        case NodeType.StringLiteral:
          return `<span style="color:#ce9178">"${node.value}"</span>`;
        case NodeType.NumberLiteral:
          return `<span style="color:#b5cea8">${node.value}</span>`;
        case NodeType.CallExpression:
          const transformedParams = node.params
            .map(param => walk(param))
            .join("");

          return `<span style="color:#DCDCAA">${
            node.name || ""
          }(${transformedParams})</span>`;
        case NodeType.Separator:
          return `<span style="color:lime">${node.value}</span>`;
        case NodeType.Regex:
          return `<span style="color:red">${node.value}</span>`;
        case NodeType.InlineComment:
          return `<span style="color:grey">${node.value}</span>`;
        default:
          return node.value;
      }
    }

    while (current < nodes.length) {
      transformed.push(walk());
    }

    transformed.push(`</pre>`);

    return transformed.join("");
  }
}
