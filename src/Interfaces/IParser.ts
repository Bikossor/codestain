import { ParserState } from "rudus/dist/types/ParserState";

export interface IParser {
  parse(input: string): ParserState; // TODO: maybe use a generic version of ParserState in the future
}
