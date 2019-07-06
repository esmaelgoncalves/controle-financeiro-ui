import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CommonsModule } from './../commons/commons.module';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      CommonsModule,

      LancamentosRoutingModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputTextareaModule,
      CalendarModule,
      SelectButtonModule,
      DropdownModule,
      CurrencyMaskModule
   ],
   declarations: [
      LancamentosPesquisaComponent,
      LancamentoCadastroComponent
      ],
   exports: []
})
export class LancamentosModule { }
