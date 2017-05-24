import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadassPage } from './badass';

@NgModule({
  declarations: [
    BadassPage,
  ],
  imports: [
    IonicPageModule.forChild(BadassPage),
  ],
  exports: [
    BadassPage
  ]
})
export class BadassModule {}
