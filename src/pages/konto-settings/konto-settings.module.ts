import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KontoSettingsPage } from './konto-settings';

@NgModule({
  declarations: [
    KontoSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(KontoSettingsPage),
  ],
  exports: [
    KontoSettingsPage
  ]
})
export class KontoSettingsModule {}
