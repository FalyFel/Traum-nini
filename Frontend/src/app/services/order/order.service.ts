import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Template} from "../../models/Template/template";
import {Ingredient} from "../../models/Ingredient/ingredient";
import {Order} from "../../models/Order/order";



@Injectable()
export class OrderService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    placeOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/newOrder`, order);
    }

    getOrders(username: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/getUserOrder`, {params: {username}});
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/getOrder`, );
    }

    acceptOrder(orderNum: number): Observable<number> {
        return this.http.post<number>(`${this.apiUrl}/acceptOrder`, {orderNum: orderNum});
    }



}