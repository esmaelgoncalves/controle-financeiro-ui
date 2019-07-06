import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CommonsModule } from './../commons/commons.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasRoutingModule } from './pessoas-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PessoasRoutingModule,

    CommonsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule
  ],
  declarations: [
     PessoaCadastroComponent,
     PessoasPesquisaComponent
  ],
   exports: [ ]
})
export class PessoasModule { }
