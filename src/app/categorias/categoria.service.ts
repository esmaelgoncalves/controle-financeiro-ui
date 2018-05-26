import { environment } from './../../environments/environment';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: AuthHttp) {
     this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {
    const params = new URLSearchParams();
    return this.http.get(`${this.categoriasUrl}?`)
      .toPromise()
      .then(response => response.json());
  }

}
