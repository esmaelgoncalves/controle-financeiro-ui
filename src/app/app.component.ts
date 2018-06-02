import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

   msgs: any;

    constructor(private router: Router) {

    }

    exibeNavBar() {
        return this.router.url !== '/login';
    }
}
