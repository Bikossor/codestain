import { InputLanguage } from "./types";
import { createParser, createTransformer } from "./factories";
import { tokenizer } from "./tokenizer";

export const Codestain = (language: InputLanguage, input: string) => {
  const tokens = tokenizer(input);

  const parser = createParser(language);
  const ast = parser.parse(tokens);

  const transformer = createTransformer("HTML");
  const output = transformer.transform(ast);

  return output;
};
