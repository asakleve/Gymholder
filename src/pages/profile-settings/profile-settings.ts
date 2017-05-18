import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfileSettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettings');
  }


passwordToast() {
    let toast = this.toastCtrl.create({
      message: 'New Password has been Saved',
      duration: 6000
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Remove Picture?',
      subTitle: 'Are you sure you would like to remove your profile picture?',
      buttons: ['OK', 'Cancel']
    });
    alert.present();
  }
}
