import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoasAdicionada => {
        this.messageService.add({ severity: 'success', summary: 'Nova Pessoa', detail: 'Pessoa salva com sucesso!' })

        this.router.navigate(['/pessoas', pessoasAdicionada.codigo]);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({ severity: 'success', summary: 'Pessoa Atualizada', detail: 'Pessoa atualizada com sucesso!' })

        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }


}
