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
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
       this.pessoaService.adicionar(this.pessoa)
       .then(() => {
           this.messageService.add({ severity: 'success', summary: 'Nova Pessoa', detail: 'Pessoa salva com sucesso!' })

           form.reset();
           this.pessoa = new Pessoa();
       })
       .catch(error => this.errorHandlerService.handle(error));
   }

}
