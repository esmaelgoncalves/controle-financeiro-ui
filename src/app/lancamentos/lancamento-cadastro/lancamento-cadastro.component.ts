import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';

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

   categorias = [ ];
   pessoas = [ ];

   lancamento = new Lancamento();

   constructor(
       private pessoaService: PessoaService,
       private categoriaService: CategoriaService,
       private lancamentoService: LancamentoService,
       private errorHandlerService: ErrorHandlerService,
       private messageService: MessageService
   ) { }

   ngOnInit() {
       this.carregarCategorias();
       this.carregarPessoas();
   }

   salvar(form: FormControl) {
       this.lancamentoService.adicionar(this.lancamento)
       .then(() => {
           this.messageService.add({ severity: 'success', summary: 'Novo Lançamento', detail: 'Lançamento adicionado com sucesso!' })

           form.reset();
           this.lancamento = new Lancamento();
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
       .catch(error =>this.errorHandlerService.handle(error));
   }

   carregarPessoas(){
       this.pessoaService.pesquisarTodos()
       .then(pessoas => {
           this.pessoas = pessoas.map(pes => ({
              label: pes.nome,
              value: pes.codigo
           }))
       })
       
   }

}
