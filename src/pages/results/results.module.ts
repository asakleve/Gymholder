import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Results } from './results';

@NgModule({
  declarations: [
    Results,
  ],
  imports: [
    IonicPageModule.forChild(Results),
  ],
  exports: [
    Results
  ]
})
export class ResultsModule {}
