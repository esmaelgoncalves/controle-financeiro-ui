import { SegurancaRoutingModule } from './seguranca/seguranca-routing,module';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoasRoutingModule } from './pessoas/pessoas-routing.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

// Angular Modules
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';


const routes: Routes = [
   { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
   { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

    { path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }

];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        SegurancaRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
