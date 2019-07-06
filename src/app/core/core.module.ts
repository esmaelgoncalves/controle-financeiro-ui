import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from './../seguranca/auth.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// import { ToastyModule } from 'ng2-toasty';
// PrimeNG Modules
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { JwtHelper } from 'angular2-jwt';

// Services
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from './../categorias/categoria.service';
import { Title } from '@angular/platform-browser';


import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    // ToastyModule.forRoot(),
    RouterModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [NavbarComponent, GrowlModule, ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    CategoriaService,
    Title,
    AuthService,
    JwtHelper,
    { provide: LOCALE_ID, useValue: 'pt' }

  ]
})
export class CoreModule { }
