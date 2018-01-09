import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { CommonsModule } from './../commons/commons.module';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CommonsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule
  ],
  declarations: [
     PessoaCadastroComponent,
     PessoasPesquisaComponent,
     PessoasGridComponent
  ],
   exports: [
      PessoaCadastroComponent,
      PessoasPesquisaComponent
   ]
})
export class PessoasModule { }
