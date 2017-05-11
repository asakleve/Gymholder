import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyChallengesPage } from './my-challenges';

@NgModule({
  declarations: [
    MyChallengesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyChallengesPage),
  ],
  exports: [
    MyChallengesPage
  ]
})
export class MyChallengesModule {}
