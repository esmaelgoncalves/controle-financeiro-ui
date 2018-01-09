import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CommonsModule } from './../commons/commons.module';

import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,

      CommonsModule,

      InputTextModule,
      ButtonModule,
      DataTableModule,
      TooltipModule,
      InputTextareaModule,
      CalendarModule,
      SelectButtonModule,
      DropdownModule,
      CurrencyMaskModule
   ],
   declarations: [
      LancamentosPesquisaComponent,
      LancamentoCadastroComponent,
      LancamentosGridComponent
   ],
   exports: [
      LancamentoCadastroComponent,
      LancamentosPesquisaComponent
   ]
})
export class LancamentosModule { }
