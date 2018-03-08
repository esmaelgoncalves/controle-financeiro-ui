import { MessageService } from 'primeng/components/common/messageservice';
import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any){
    let msg: string;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    } else if (errorResponse instanceof Response
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else{
      msg = 'Erro ao processar serviço remoto. Tente Novamente.';
      console.log('Ocorreu um erro: ' + errorResponse);
    }

    this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });

  }
}
