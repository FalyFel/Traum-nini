/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import {provideRouter} from "@angular/router";
import {routes} from './app/router';
import {UserService} from "./app/services/user/user.service";
import {AuthenticationService} from "./app/services/auth/auth.service";
import {AuthGuard} from "./app/guards/auth.guard";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TemplateService} from "./app/services/template/template.service";
import { IngredientService } from './app/services/ingredient/ingredient.service';
import {OrderService} from "./app/services/order/order.service";

bootstrapApplication(App, {providers:
        [
            provideProtractorTestingSupport() ,
            provideRouter(routes),
            AuthGuard,
            AuthenticationService,
            UserService,
            TemplateService,
            IngredientService,
            OrderService,
            HttpClient,
            provideHttpClient(),
        ]
}).catch((err) =>
    console.error(err),
);