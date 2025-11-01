import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {User} from "../../models/User/user";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    imports: [
        ReactiveFormsModule,
        MatButton,
        NgIf,
        RouterLink,
    ],
    templateUrl: 'home.html'
})
export class HomeComponent implements OnInit {

    currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    ngOnInit(): void {

        console.log(this.currentUser);
    }
}
