import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

   oauthTokenUrl: string;
   jwtPayload: any;

   constructor(private http: Http, private jwtHelper: JwtHelper) {
      this.oauthTokenUrl =  `${environment.apiUrl}/oauth/token`;
      this.carregarToken();
   }

   login(usuario: string, senha: string): Promise<void> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
         .toPromise()
         .then(response => {
            this.amarzenarToken(response.json().access_token);
         })
         .catch(response => {
            if (response.status === 400) {
               const responseJson = response.json();

               if (responseJson.error === 'invalid_grant') {
                  return Promise.reject('Usuário ou Senha Inválidos');
               }
            }
            return Promise.reject(response);
         });
   }

   private amarzenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
   }

   private carregarToken() {
      const token = localStorage.getItem('token');

      if (token) {
         this.amarzenarToken(token);
      }
   }

   temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
   }

   obterNovoAccessToken(): Promise<void> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');

      const body = 'grant_type=refresh_token';

      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
         .toPromise()
         .then(response => {
            this.amarzenarToken(response.json().access_token);

            return Promise.resolve(null);
         })
         .catch(response => {
            console.log('Erro ao gerar token.', response);
            return Promise.resolve(null);
         });
   }

   isAccessTokenInvalid() {
      const token = localStorage.getItem('token');

      return !token || this.jwtHelper.isTokenExpired(token);
   }

   temQualquerPermissao(roles) {
      for (const role of roles) {
        if (this.temPermissao(role)) {
          return true;
        }
      }
      return false;
    }

    limparAccessToken() {
       localStorage.removeItem('token');
       this.jwtPayload = null;
    }
}
