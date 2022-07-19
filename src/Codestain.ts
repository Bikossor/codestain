import { InputLanguage } from "./types";
import { createParser, createTransformer } from "./factories";
import { NodeType } from "./enums";

export const Codestain = (language: InputLanguage, input: string) => {
  const parser = createParser(language);
  // TODO: remove type cast in the future
  const parsedInput = parser.parse(input);

  if (parsedInput.isError) console.error(parsedInput.errorMessage);

  const transformer = createTransformer("HTML");
  const output = transformer.transform(
    parsedInput.result as unknown as Array<[NodeType, string]>,
  );

  return output;
};
