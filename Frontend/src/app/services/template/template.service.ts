import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {AddTemplate, Template} from "../../models/Template/template";
import {Order} from "../../models/Order/order";
import {TemplatePos} from "../../models/Template/templatePos";


@Injectable()
export class TemplateService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {
    }

    getAllForUser(username: String): Observable<Template[]> {
        // @ts-ignore
        return this.http.get<Template[]>(`${this.apiUrl}/templates`, {params: {username}});
    }


    addNewTemplate(template: AddTemplate): Observable<Template> {
        return this.http.post<Template>(`${this.apiUrl}/newTemplate`, template);
    }


    getDetails(templateID: number): Observable<TemplatePos[]> {
        return this.http.get<TemplatePos[]>(`${this.apiUrl}/getDetails`, {params: {templateID}});
    }
}


