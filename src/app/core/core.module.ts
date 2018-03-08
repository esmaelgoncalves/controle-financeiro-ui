import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ToastyModule } from 'ng2-toasty';
//PrimeNG Modules
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

//Services
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from "primeng/components/common/api";
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from './../categorias/categoria.service';





@NgModule({
  imports: [
    CommonModule,
    //ToastyModule.forRoot(),
    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, GrowlModule, ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    CategoriaService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ]
})
export class CoreModule { }
