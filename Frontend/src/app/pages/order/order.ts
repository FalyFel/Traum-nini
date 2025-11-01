import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {User} from "../../models/User/user";
import {AsyncPipe, CurrencyPipe, DecimalPipe, NgFor, NgIf} from "@angular/common";
import {Template} from "../../models/Template/template";
import {Observable, of, tap} from "rxjs";
import {TemplateService} from "../../services/template/template.service";
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {map} from "rxjs/operators";
import {Ingredient} from "../../models/Ingredient/ingredient";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {MatCard} from "@angular/material/card";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../models/Order/order";
import {Router} from "@angular/router";

@Component({
    imports: [
        ReactiveFormsModule,
        NgIf,
        AsyncPipe,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCard,
        NgFor,
        CurrencyPipe,
        DecimalPipe,
    ],
    templateUrl: 'order.html',
    styleUrls: ['order.scss'],
})
export class OrderComponent implements OnInit {

    currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    //templates$: Observable<Template[]>;
    ingredientList$: Observable<Ingredient[]> =  this.ingredientService.getAllIngredients()
    templates$: Observable<Template[]> =  this.templateService.getAllForUser(this.currentUser.user.username);
    selectedTemplate: Template | undefined;
    templateName = 'lecker Panini yumyyyy'
    constructor(
        private templateService: TemplateService,
        private ingredientService: IngredientService,
        private router: Router,
        private orderService: OrderService,
) {
        //this.templates$ = templateService.getAllForUser()
        console.log(this.currentUser.username);
    }

    selectedIngredients: Ingredient[] = [];
    public price: number = 0

    toggleIngredient(ingredient: Ingredient) {
        if (this.selectedIngredients.includes(ingredient)) {
            this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
        } else {
            this.selectedIngredients.push(ingredient);
        }
        this.calculatePrice()
    }

    clearPanini() {
        this.selectedIngredients = [];
    }
    ngOnInit(): void {
        console.log(this.currentUser.user.username);
        this.templates$.subscribe(templates => templates.forEach(template => {
            console.log(template.name );}))
        this.templates$.pipe(tap(v => console.log(v)))
        this.ingredientList$.subscribe(v => console.log(v))
    }

    calculatePrice(){
        this.price=0
        this.selectedIngredients.map(v=>this.price += v.preis)
    }
    orderPanini(){
        this.calculatePrice()

        console.log(this.price);
        console.log(this.selectedIngredients);
        this.orderService.placeOrder({
                username: this.currentUser.user.username,
                price: this.price,
                ingredients: this.selectedIngredients})
            .subscribe({
            next: (response) => console.log("Order erfolgreich gesendet:", response),
            error: (err) => console.error("Fehler beim Senden:", err)})

        this.router.navigate(['/']);
    }

    addTemplate(){
        console.log(this.selectedIngredients);
        this.templateService.addNewTemplate({
            username: this.currentUser.user.username,
            name: this.templateName,
            ingredients: this.selectedIngredients})
            .subscribe({
            next: (response) => console.log("Order erfolgreich gesendet:", response),
            error: (err) => console.error("Fehler beim Senden:", err)})

    }

    applyTemplate(template: Template){
        console.log(template);
        this.selectedIngredients=[]
        let ingredients = this.templateService.getDetails(template.templateID)
        ingredients.subscribe({
            next: (response) => console.log("Order erfolgreich gesendet:", response),
            error: (err) => console.error("Fehler beim Senden:", err)})
        ingredients.pipe(tap(v=> console.log(v))).subscribe()
        ingredients.pipe(map(v=> v.map(v=>this.selectedIngredients.push({id: v.ingredientsID, preis: v.preis, name:v.ingredientName})))).subscribe(v=>this.calculatePrice())
        console.log(this.selectedIngredients);

    }

    protected readonly length = length;
}
