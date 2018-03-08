import { Pessoa } from './../core/model/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string;
  ativo: Boolean;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'https://egp-controlefinanceiro-api.herokuapp.com/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set("nome", filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarTodos() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');
    return this.http.get(`${this.pessoasUrl}?`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  atualizar(codigo: number, status: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status, { headers })
      .toPromise()
      .then(() => console.log(`${this.pessoasUrl}/${codigo}/ativo`));
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AZWdwLWNvbnRyb2xlZmluYW5jZWlyby5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json());
  }

}
