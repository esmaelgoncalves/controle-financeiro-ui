import { LazyLoadEvent } from 'primeng/components/common/api';
import { PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() filtro: PessoaFiltro;
  @Input() totalRegistros: number;

  @Output() gridEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() updateStatusEvent = new EventEmitter();

  @ViewChild('tabela') tabela;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.gridEvent.emit(pagina.toString());
  }

  confirmarExclusao(pessoa: any) {
    this.deleteEvent.emit(pessoa);
  }

  atualizarStatus(pessoa: any) {
    console.log(pessoa);
    this.updateStatusEvent.emit(pessoa);
  }
}
