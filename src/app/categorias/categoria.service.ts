import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');

    return this.http.get(`${this.categoriasUrl}?`, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
