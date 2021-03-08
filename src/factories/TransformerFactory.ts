import { ITransformer } from "../Interfaces";
import { HtmlTransformer } from "../transformer";
import { OutputFormat } from "../types";

export const createTransformer = (language: OutputFormat): ITransformer => {
    switch (language) {
        case "HTML":
            return new HtmlTransformer();
        default:
            throw new Error("OutputFormat not supported!");
    }
};
