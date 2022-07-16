import {
  anyOf,
  regex,
  sequenceOf,
  string,
  optional,
  whitespace,
  between,
} from "rudus";
import { NodeType } from "../enums";
import { IParser } from "../Interfaces";

const betweenDoubleQuotes = between(string('"'));
const optionalWhitespace = optional(whitespace()).map(state => [
  NodeType.Whitespace,
  state.result,
]);

const declarationKeyword = regex(/^var|let|const/);
const word = regex(/\w+/); // word
const equalSign = string("=");

const literalBool = regex(/^true|false$/);
const literalUndefined = regex(/undefined/);
const literalNull = regex(/null/);
const literalNumber = regex(/^(\d+\.)?\d+$|^0b[0-1]+(n)?$/);
const literalString = betweenDoubleQuotes(word);

const variableValue = anyOf([
  literalBool.map(state => [NodeType.BooleanLiteral, state.result]),
  literalString.map(state => [NodeType.StringLiteral, state.result]),
  literalNumber.map(state => [NodeType.NumberLiteral, state.result]),
  literalUndefined.map(state => [NodeType.Identifier, state.result]),
  literalNull.map(state => [NodeType.Identifier, state.result]),
]);

const variableParser = sequenceOf([
  declarationKeyword.map(state => [NodeType.Keyword, state.result]),
  optionalWhitespace,
  word.map(state => [NodeType.Identifier, state.result]),
  optionalWhitespace,
  equalSign.map(state => [NodeType.Operator, state.result]),
  optionalWhitespace,
  variableValue,
]);

export class JavaScriptParser implements IParser {
  parse(input: string) {
    return variableParser.run(input);
  }
}
