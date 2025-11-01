import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconButton} from "@angular/material/button";
import {UserService} from "./services/user/user.service";
import {AuthenticationService} from "./services/auth/auth.service";


@Component({
  selector: 'app-root',
  imports: [RouterModule, MatIcon, MatIcon, MatIconButton],
  template: `
    <main class="h-screen w-screen flex flex-col body">
      <a [routerLink]="['/']">
      <header class="headerBar flex align-items-center" id="navbar">
        <div class="flex flex-row justify-between mb-1">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <section [routerLink]="'/'"

                   class="navigation-bar-logo navigation-bar__logo">
            <img src="../assets/chimken.svg" class="navigation-bar-logo__logo hover:-rotate-12 hover:scale-110"/>
          </section>
          <section (click)="logout()"
                   class="navigation-bar-logo ">
          <img src="../assets/logout.svg" class=" hover:scale-110"/>
        </section>
        
        </div>
      </header > 
        
      </a>
      <section >
        <div>
        <router-outlet ></router-outlet>
        </div>
      </section>
    </main>
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'homes';

  constructor(
              public iconRegistry: MatIconRegistry,
              public sanitizer: DomSanitizer,
              public authService: AuthenticationService,
              public router: Router
  ) {



  iconRegistry.addSvgIcon("chimken", sanitizer.bypassSecurityTrustResourceUrl("../assets/chimken.svg"));
  iconRegistry.addSvgIcon("logout", sanitizer.bypassSecurityTrustResourceUrl("../assets/logout.svg"));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
