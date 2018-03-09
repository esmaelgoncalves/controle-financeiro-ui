import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-lancamento-cadastro',
    templateUrl: './lancamento-cadastro.component.html',
    styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    tipos = [
        { label: 'Receita', value: 'RECEITA' },
        { label: 'Despesa', value: 'DESPESA' },
    ];

    categorias = [];
    pessoas = [];

    lancamento = new Lancamento();

    constructor(
        private pessoaService: PessoaService,
        private categoriaService: CategoriaService,
        private lancamentoService: LancamentoService,
        private errorHandlerService: ErrorHandlerService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) { }

    ngOnInit() {     
        this.title.setTitle('Novo Lançamento');

        const codigoLancamento = this.route.snapshot.params['codigo'];

        if (codigoLancamento) {
            this.carregarLancamento(codigoLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();
    }

    carregarLancamento(codigo: number) {
        this.lancamentoService.buscarPorCodigo(codigo)
            .then(lancamento => {
                this.lancamento = lancamento;
                this.atualizarTituloEdicao();
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    salvar(form: FormControl) {
        if (this.editando) {
            this.atualizaLancamento(form);
        } else {
            this.adicionarLancamento(form);
        }
    }

    adicionarLancamento(form: FormControl) {
        this.lancamentoService.adicionar(this.lancamento)
            .then(lancamentoAdicionado => {
                this.messageService.add({ severity: 'success', summary: 'Novo Lançamento', detail: 'Lançamento adicionado com sucesso!' })

                this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    atualizaLancamento(form: FormControl) {
        this.lancamentoService.atualizar(this.lancamento)
            .then(lancamento => {
                this.lancamento = lancamento;
                this.atualizarTituloEdicao();
                this.messageService.add({ severity: 'success', summary: 'Atualização Lançamento', detail: 'Lançamento atualizado com sucesso!' })
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    carregarCategorias() {
        this.categoriaService.listarTodas()
            .then(categorias => {
                this.categorias = categorias.map(cat => {
                    return {
                        label: cat.nome,
                        value: cat.codigo
                    }
                });
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    carregarPessoas() {
        this.pessoaService.pesquisarTodos()
            .then(pessoas => {
                this.pessoas = pessoas.map(pes => ({
                    label: pes.nome,
                    value: pes.codigo
                }))
            })

    }

    novo(form: FormControl){
        form.reset();

        setTimeout(function(){
            this.lancamento = new Lancamento();
        }.bind(this), 1);
        
        this.router.navigate(['/lancamentos/novo'])
    }

    atualizarTituloEdicao(){
        this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
    }

    get editando() {
        return Boolean(this.lancamento.codigo);
    }

}
