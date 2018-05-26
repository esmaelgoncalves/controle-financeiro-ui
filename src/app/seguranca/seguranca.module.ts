import { AuthGuard } from './auth.guard';
import { ControleFinanceiroHttp } from './controle-financeiro-http';
import { Http, RequestOptions } from '@angular/http';
import { SegurancaRoutingModule } from './seguranca-routing,module';
import { ButtonModule } from 'primeng/components/button/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
   const config = new AuthConfig({
      globalHeaders: [
         {'Content-Type': 'application/json'}
      ]
   });
   return new ControleFinanceiroHttp(auth, config, http, options);
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
        deps: [AuthService, Http, RequestOptions]
     },
     AuthGuard,
     LogoutService
  ]
})
export class SegurancaModule { }
