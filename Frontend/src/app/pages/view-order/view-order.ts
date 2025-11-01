import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {User} from "../../models/User/user";
import {CommonModule, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../models/Order/order";

@Component({
    imports: [
        ReactiveFormsModule,
        MatButton,
        NgIf,
        DatePipe,
        DecimalPipe,
        CommonModule
    ],
    templateUrl: 'view-order.html',

})
export class ViewOrderComponent implements OnInit {
    currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    orders: Order[] = [];
    loading = true;
    error: string | null = null;

    openIndex: number | null = null;
    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        console.log(this.currentUser);
        this.currentUser.user.isAdmin? this.orderService.getAllOrders().subscribe({
            next: (data) => {
                this.orders = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = err.message;
                this.loading = false;
            }
        })
            :
        this.orderService.getOrders(this.currentUser!.user!.username).subscribe({
            next: (data) => {
                this.orders = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = err.message;
                this.loading = false;
            }
        });
    }
    toggleDetails(index: number) {
        this.openIndex = this.openIndex === index ? null : index;
        console.log(this.openIndex);
    }
    acceptOrder(order: Order) {
        order.orderNum? this.orderService.acceptOrder(order.orderNum).subscribe(
            {
                next: (data) => {
                },
                error: (err) => {
                    this.error = err.message;
                }
            }
        ): ""
        this.orderService.getAllOrders().subscribe({
            next: (data) => {
                this.orders = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = err.message;
                this.loading = false;
            }
        })
    order.confirmed = true
    }

}