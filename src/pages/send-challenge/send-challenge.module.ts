import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendChallengePage } from './send-challenge';

@NgModule({
  declarations: [
    SendChallengePage,
  ],
  imports: [
    IonicPageModule.forChild(SendChallengePage),
  ],
  exports: [
    SendChallengePage
  ]
})
export class SendChallangeModule {}
