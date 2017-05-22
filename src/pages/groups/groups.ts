import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';

/**
 * Generated class for the Groups page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private backendService: BackendService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Groups');
  }

   groupDeletedToast() {
    let toast = this.toastCtrl.create({
      message: 'Group deleted',
      duration: 3000
    });
    toast.present();
  }

 deleteGroup() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Group?',
      message: 'Do you want to delete this group?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.groupDeletedToast();
          }
        }
      ]
    });
    confirm.present();
  }




}
