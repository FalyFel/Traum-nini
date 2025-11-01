import {Ingredient} from "../Ingredient/ingredient";

export interface Template {
    templateID: number;
    name: string;
    username?: string;
}
export interface AddTemplate {
    ingredients: Ingredient[];
    name: string;
    username?: string;
}
export class Template{

    constructor(name: string, username?: string) {}

}