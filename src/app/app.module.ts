import { SegurancaModule } from './seguranca/seguranca.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
//Angular Modules
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//App Components
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,

        AppRoutingModule,

        CoreModule,
        SegurancaModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
