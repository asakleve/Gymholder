import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';

/**
 * Generated class for the Friends page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
friends: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public toastCtrl: ToastController,private backendService: BackendService) {
  	this.friends = [];
  	this.friends.push("Sebastian");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Friends');
  }
 friendDeletedToast() {
    let toast = this.toastCtrl.create({
      message: 'Friend deleted',
      duration: 3000
    });
    toast.present();
  }

 deleteFriend() {
    let confirm = this.alertCtrl.create({
      title: 'Delete friend?',
      message: 'Do you want to delete Sebastian?',
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
            this.friendDeletedToast();
          }
        }
      ]
    });
    confirm.present();
  }


  getItems(ev) {
    // Reset items back to all of the items
    

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
