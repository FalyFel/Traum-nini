import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Template} from "../../models/Template/template";
import {Ingredient} from "../../models/Ingredient/ingredient";


@Injectable()
export class IngredientService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`);
    }


}