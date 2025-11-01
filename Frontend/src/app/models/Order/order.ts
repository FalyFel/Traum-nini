import {Ingredient} from "../Ingredient/ingredient";

export interface Order {
    username: string ;
    price: number ;
    ingredients?: Ingredient[] ;
    orderNum?: number ;
    timeOfOrder?: number
    confirmed?: boolean;

}

