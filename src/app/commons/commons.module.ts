import { MessagesComponent } from './messages/messages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagesComponent],
  exports: [MessagesComponent]
})
export class CommonsModule { }
