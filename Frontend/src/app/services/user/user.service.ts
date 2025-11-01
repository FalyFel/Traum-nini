import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";


export interface User {
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    password?: string;
}


@Injectable()
export class UserService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }


    register(user: User): Observable<User> {
        user.isAdmin = false;
        return this.http.post<User>(`${this.apiUrl}/newUser`, user);
    }

    delete(username: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/user/${username}`);
    }

}