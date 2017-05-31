import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

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
friend: any;
searchUsers: any [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public toastCtrl: ToastController,private backendService: BackendService, public authService: AuthService) {
  	this.activeUser = this.authService.getUser();
    //this.loadUserData(this.activeUser.userid);
    this.friendlist = [];
    this.displayFriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Friends');

  }

  displayFriends(){
    this.friendlist = [];
    this.backendService.getFriends(this.activeUser.userid)
       .subscribe(data => {
        this.friendlist = (data);
       });
  }

  searchUser(name){
    this.friendlist = [];
    this.backendService.searchUser(name)
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

// addFriend(){
// console.log(this.activeUser);
// console.log(this.profileOwner);
// this.backendService.checkIfFriends(this.profileOwner.id,this.activeUser.userid)
// .subscribe(success=> {
//   if(success){
//     this.alreadyFriendsAlert()
//     console.log("Redan vänner");
//   }else{

// this.backendService.postFriend(this.profileOwner.id,this.activeUser.userid);
//    this.presentToast();

//  }
// })
  
//  }

//  alreadyFriendsAlert() {
//     let alert = this.alertCtrl.create({
//       subTitle: 'You are already friends with ' + this.profileOwner.username,
//       buttons: ['OK']
//     });
//     alert.present();
//   }

// deleteFriend(){

// this.backendService.deleteFriend(this.profileOwner.id,this.activeUser.userid);
// }

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

  openProfile(userid: number){
    this.navCtrl.push(ProfilePage, { userid: userid });
  }
  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Search friends',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Search',
          handler: data => {
            console.log('Saved clicked');
            console.log(data.name);
            this.searchUser(data.name);
          }
        }
      ]
    });
    prompt.present();
  }

}
