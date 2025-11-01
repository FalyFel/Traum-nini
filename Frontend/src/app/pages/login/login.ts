import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth/auth.service';
import {NgClass, NgIf} from "@angular/common";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatButton} from "@angular/material/button";

@Component({
    imports: [
        ReactiveFormsModule,
        NgClass,
        RouterLink,
        NgIf,
        MatButton
    ],
    templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;

    currentUser = localStorage.getItem('currentUser');

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.loginForm.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f)
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}
