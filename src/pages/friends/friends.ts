import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';

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
//friends: any[];
activeUser: any;
friendlist: any [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public toastCtrl: ToastController,private backendService: BackendService, public authService: AuthService) {
  	this.activeUser = this.authService.getUser();
    //this.loadUserData(this.activeUser.userid);
    this.friendlist = [];
    this.displayFriends(this.activeUser.userid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Friends');

  }

  // loadUserData(userid: number) {
  //   this.activeUser = this.backendService.getUser(userid)
  //   .subscribe(data => {
  //     this.activeUser = data;
  //   });
  // }

  displayFriends(userid){
    this.friendlist = [];
    this.backendService.getFriends(userid)
       .subscribe(data => {
        this.friendlist = (data);
       });
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



}
