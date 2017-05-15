import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPopOverPage } from './messages-pop-over';

@NgModule({
  declarations: [
    MessagesPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesPopOverPage),
  ],
  exports: [
    MessagesPopOverPage
  ]
})
export class MessagesPopOverModule {}
