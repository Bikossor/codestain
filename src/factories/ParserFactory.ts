import { IParser } from "../Interfaces";
import { JavaScriptRudusParser } from "../parser";
import { InputLanguage } from "../types";

export const createParser = (language: InputLanguage): IParser => {
  switch (language) {
    case "JavaScript":
      return new JavaScriptRudusParser();
    default:
      throw new Error("InputLanguage not supported!");
  }
};
