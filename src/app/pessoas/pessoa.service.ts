import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

export class PessoaFiltro {
   nome: string;
   ativo: Boolean;
   pagina = 0;
   itensPorPagina = 2;
}

@Injectable()
export class PessoaService {

   pessoasUrl: string;

   constructor(private http: AuthHttp) {
      this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

   pesquisar(filtro: PessoaFiltro): Promise<any> {
      const params = new URLSearchParams();

      params.set('page', filtro.pagina.toString());
      params.set('size', filtro.itensPorPagina.toString());

      if (filtro.nome) {
         params.set('nome', filtro.nome);
      }

      return this.http.get(`${this.pessoasUrl}?`, { search: params })
         .toPromise()
         .then(response => {
            const responseJson = response.json();
            const pessoas = responseJson.content;

            const resultado = {
               pessoas,
               total: responseJson.totalElements
            };

            return resultado;
         });
   }

   pesquisarTodos() {
      return this.http.get(`${this.pessoasUrl}?`)
         .toPromise()
         .then(response => response.json().content);
   }

   excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.pessoasUrl}/${codigo}`)
         .toPromise()
         .then(() => null);
   }

   atualizar(codigo: number, status: boolean): Promise<void> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status, { headers })
         .toPromise()
         .then(() => console.log(`${this.pessoasUrl}/${codigo}/ativo`));
   }

   adicionar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
         .toPromise()
         .then(response => response.json());
   }

   atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
         .toPromise()
         .then(response => response.json());
   }

   buscarPorCodigo(codigo: number): Promise<Pessoa> {
      return this.http.get(`${this.pessoasUrl}/${codigo}`)
         .toPromise()
         .then(response => response.json());
   }

}
