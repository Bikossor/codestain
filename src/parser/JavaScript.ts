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
const optionalWhitespace = optional(whitespace());

const declarationKeyword = regex(/^var|let|const/);
const word = regex(/\w+/); // word
const equalSign = string("=");

const literalBool = regex(/true|false/);
const literalUndefined = regex(/undefined/);
const literalNull = regex(/null/);
const literalNumber = regex(/^(\d+\.)?\d+$|^0b[0-1]+(n)?$/);
const literalString = betweenDoubleQuotes(word);

const variableValue = anyOf([
  literalBool,
  literalString,
  literalNumber,
  literalUndefined,
  literalNull,
]);

const variableParser = sequenceOf([
  declarationKeyword.map(state => [NodeType.Keyword, state.result]),
  optionalWhitespace,
  word.map(state => [NodeType.Identifier, state.result]),
  optionalWhitespace,
  equalSign.map(state => [NodeType.Operator, state.result]),
  optionalWhitespace,
  variableValue.map(state => [NodeType.Identifier, state.result]),
]);

export class JavaScriptParser implements IParser {
  parse(input: string) {
    return variableParser.run(input);
  }
}
