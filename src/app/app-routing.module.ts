import { SegurancaRoutingModule } from './seguranca/seguranca-routing,module';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoasRoutingModule } from './pessoas/pessoas-routing,module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

//Angular Modules
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'},
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PessoasRoutingModule,
        LancamentosRoutingModule,
        SegurancaRoutingModule
    ],
    exports:[RouterModule]
})
export class AppRoutingModule { }
