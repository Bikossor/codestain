import {
  anyOf,
  regex,
  sequenceOf,
  string,
  optional,
  whitespace,
  between,
} from "rudus";

console.time();

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
  declarationKeyword.map(
    state => `<span style="color:red">${state.result}</span>`,
  ),
  optionalWhitespace,
  word.map(state => `<span style="color:green">${state.result}</span>`),
  optionalWhitespace,
  equalSign.map(state => `<span style="color:grey">${state.result}</span>`),
  optionalWhitespace,
  variableValue.map(state => `<span style="color:blue">${state.result}</span>`),
]);

const parserResult = variableParser.run("const isCool = null");

console.timeEnd();

if (parserResult.isError) {
  console.log(parserResult.errorMessage);
} else {
  console.log(parserResult.result);
}
