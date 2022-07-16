import { InputLanguage } from "./types";
import { createParser, createTransformer } from "./factories";
import { NodeType } from "./enums";

export const Codestain = (language: InputLanguage, input: string) => {
  const parser = createParser(language);
  // TODO: remove type cast in the future
  const ast = parser.parse(input).result as unknown as Array<
    [NodeType, string]
  >;

  const transformer = createTransformer("HTML");
  const output = transformer.transform(ast);

  return output;
};
