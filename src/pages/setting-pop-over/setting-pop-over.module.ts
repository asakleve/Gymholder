import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPopOverPage } from './setting-pop-over';

@NgModule({
  declarations: [
    SettingPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPopOverPage),
  ],
  exports: [
    SettingPopOverPage
  ]
})
export class SettingPopOverModule {}
