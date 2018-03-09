import { Title } from '@angular/platform-browser';
import { PessoasGridComponent } from './../pessoas-grid/pessoas-grid.component';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  totalRegistros = 0;
  pessoas = [];

  //@ViewChild('PessoasGridComponent') gridComponent: PessoasGridComponent;
  @ViewChild('tabela') tabela;

  constructor(
    private pessoasService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de Pessoas");
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(pagina) {
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Pessoa excluída com sucesso!' });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarStatus(pessoa: any) {
    this.pessoasService.atualizar(pessoa.codigo, !pessoa.ativo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Pessoa atualizada com sucesso!' });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
