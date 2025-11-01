import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
//const sqlite3 = require("sqlite3").verbose();

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    password?: string;
}
export interface loginParam {
    username: string;
    password: string;
}
@Injectable()
export class AuthenticationService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/checkUser`, { username, password })
            .pipe(map(user => {
                if (user ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}