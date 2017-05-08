import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GymprofilePage } from './gymprofile';

@NgModule({
  declarations: [
    GymprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(GymprofilePage),
  ],
  exports: [
    GymprofilePage
  ]
})
export class GymprofileModule {}
