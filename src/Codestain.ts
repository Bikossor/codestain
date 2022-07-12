import { InputLanguage } from "./types";
import { createParser, createTransformer } from "./factories";

export const Codestain = (language: InputLanguage, input: string) => {
  const parser = createParser(language);
  const ast = parser.parse(input);

  console.log(ast);

  // TODO: transform result of parser here
};
