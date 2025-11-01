import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login";
import {HomeComponent} from "./pages/home/home";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./pages/register/register";
import {OrderComponent} from "./pages/order/order";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {ViewOrderComponent} from "./pages/view-order/view-order";
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'order',
        canActivate: [AuthGuard],
        component: OrderComponent,
    },
    {
        path: 'viewOrders',
        canActivate: [AuthGuard],
        component: ViewOrderComponent,
    },

    { path: '**', redirectTo: '' }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes), CommonModule ],
    exports: [RouterModule]
})
export class AppRoutingModule {}