import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingPopOverPage } from '../setting-pop-over/setting-pop-over';
import { Platform, ActionSheetController } from 'ionic-angular';
import { KontoSettingsPage } from '../konto-settings/konto-settings';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { InloggPage } from '../inlogg/inlogg';

import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  item;
  event;

  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionsheetCtrl: ActionSheetController,
    ) {
    
  this.event = {
    month: '1990-03-22',
    timeStarts: '07:43',
    timeEnds: '1990-03-23'
  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  openMenu() {
      let actionSheet = this.actionsheetCtrl.create({
        title: 'Are you sure you want to log out?',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Log out',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              console.log('Log out clicked');
              this.auth.logout();
              this.navCtrl.setRoot('InloggPage');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
      toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
}