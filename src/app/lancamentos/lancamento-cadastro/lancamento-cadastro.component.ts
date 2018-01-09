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

   categorias = [
      { label: 'Alimentação', value: '1' },
      { label: 'Transporte', value: '2' },
      { label: 'Estudos', value: '3' },
      { label: 'Outros', value: '4' }
   ];

   pessoas = [
      { label: 'José da Silva', value: '1' },
      { label: 'João Rufino', value: '2' },
      { label: 'Pedro Barbosa', value: '3' },
      { label: 'Vanderlei Silva', value: '4' }
   ];

   constructor() { }

   ngOnInit() {
   }

}
