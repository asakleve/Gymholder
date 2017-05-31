import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { SettingPopOverPage } from '../setting-pop-over/setting-pop-over';
import { Platform, ActionSheetController } from 'ionic-angular';
import { KontoSettingsPage } from '../konto-settings/konto-settings';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { InloggPage } from '../inlogg/inlogg';
import { BackendService } from '../../providers/backend-service';
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
  activeUser;
  changepasswordCredentials;
  tempUser;

  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, public actionsheetCtrl: ActionSheetController, public backendService: BackendService, public toastCtrl: ToastController) {

    this.activeUser = this.auth.getUser();
    console.log("här är settingspage och activeUser" + this.activeUser.userid);
    this.changepasswordCredentials = {oldpass: '', newpass: '', repeatpass: ''}; 

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
              this.navCtrl.setRoot(InloggPage);
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

    changePassword(){

      this.backendService.validateUser(this.activeUser.userid,this.changepasswordCredentials.oldpass)
        .subscribe(data=>{
          this.tempUser==data.id;

        if ( this.tempUser == this.activeUser.userid || this.changepasswordCredentials.newpass==this.changepasswordCredentials.repeatpass){
          let hashpassword =  this.hash(this.changepasswordCredentials.newpass);
          this.backendService.putAuth(this.activeUser.userid,hashpassword)
          .subscribe(data=>{
            if (data.result == "true")
            this.showConfirmToast();
          });
        }
        else{
          console.log("kunde inte ändra lösenord");
        }
          });
    }

      hash(code: string) {
    var hex, i;
    var result = "";
    for (i = 0; i < code.length; i++) {
        hex = (code.charCodeAt(i)*31).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result;
  }

    showConfirmToast() {
    let toast = this.toastCtrl.create({
      message: 'Password changed',
      duration: 3000
    });
    toast.present();
  }

}