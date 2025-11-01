import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth/auth.service';
import {NgClass, NgIf} from "@angular/common";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";
import {MatButton} from "@angular/material/button";

@Component({
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIf,
        MatButton
    ],
    templateUrl: 'register.html'
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;

    currentUser = localStorage.getItem('currentUser');

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm.value);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f)
        //Nutzer anlegen
        this.userService.register(this.registerForm.value)
            .subscribe(
            data => {
                //einloggen
                this.authenticationService.login(this.registerForm.value.username, this.registerForm.value.password)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.router.navigate([this.returnUrl]);
                        },
                        error => {
                            this.loading = false;
                        });
            },
            error => {
                this.loading = false;
            });
    }
}
