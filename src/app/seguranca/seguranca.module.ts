import { Http, RequestOptions } from '@angular/http';
import { SegurancaRoutingModule } from './seguranca-routing,module';
import { ButtonModule } from 'primeng/components/button/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
   const config = new AuthConfig({
      globalHeaders: [
         {'Content-Type': 'application/json'}
      ]
   });
   return new AuthHttp(config, http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
     {
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
     }
  ]
})
export class SegurancaModule { }
