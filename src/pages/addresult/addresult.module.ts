import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresultPage } from './addresult';

@NgModule({
  declarations: [
    AddresultPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresultPage),
  ],
  exports: [
    AddresultPage
  ]
})
export class AddresultModule {}
