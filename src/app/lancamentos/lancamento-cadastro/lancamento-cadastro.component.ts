import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoService } from './../lancamento.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    formulario: FormGroup;

    constructor(
        private pessoaService: PessoaService,
        private categoriaService: CategoriaService,
        private lancamentoService: LancamentoService,
        private errorHandlerService: ErrorHandlerService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
       this.configurarFormulario();

       const codigoLancamento = this.route.snapshot.params['codigo'];
        this.title.setTitle('Novo Lançamento');

        if (codigoLancamento) {
            this.carregarLancamento(codigoLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();

    }

    configurarFormulario() {
       this.formulario = this.formBuilder.group({
          codigo: [],
          tipo: [ 'RECEITA', Validators.required],
          dataVencimento: [null, Validators.required],
          dataPagamento: [],
          descricao: [null, [ this.validarRequired, this.validarMinLength(5)]],
          valor: [null, Validators.required],
          pessoa: this.formBuilder.group({
             codigo: [null, Validators.required],
             nome: []
          }),
          categoria: this.formBuilder.group({
             codigo: [null, Validators.required],
             nome: []
          }),
          observacao: []
       });
    }

    validarRequired(input: FormControl) {
       return (input.value ? null : { obrigatorio: true});
    }

    validarMinLength(valor: number) {
       return (input: FormControl) => {
          return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo : {tamanho: valor}};
       };
    }

    carregarLancamento(codigo: number) {
        this.lancamentoService.buscarPorCodigo(codigo)
            .then(lancamento => {
                this.formulario.patchValue(lancamento);
                this.atualizarTituloEdicao();
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    salvar() {
        if (this.editando) {
            this.atualizaLancamento();
        } else {
            this.adicionarLancamento();
        }
    }

    adicionarLancamento() {
        this.lancamentoService.adicionar(this.formulario.value)
            .then(lancamentoAdicionado => {
                this.messageService.add({ severity: 'success', summary: 'Novo Lançamento', detail: 'Lançamento adicionado com sucesso!' });

                this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
            })
            .catch(error => this.errorHandlerService.handle(error));
    }

    atualizaLancamento() {
        this.lancamentoService.atualizar(this.formulario.value)
            .then(lancamento => {
                this.formulario.patchValue(lancamento);
                this.atualizarTituloEdicao();
                this.messageService.add(
                   { severity: 'success',
                     summary: 'Atualização Lançamento',
                     detail: 'Lançamento atualizado com sucesso!'
                  }
               );
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
                     };
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
                }));
            });

    }

    novo() {
       this.formulario.reset();
        setTimeout(function() {
            this.lancamento = new Lancamento();
        }.bind(this), 1);
        this.router.navigate(['/lancamentos/novo']);
    }

    atualizarTituloEdicao() {
        this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
    }

    get editando() {
        return Boolean(this.formulario.get('codigo').value);
    }

}
