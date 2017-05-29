import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the MyChallenges page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-challenges',
  templateUrl: 'my-challenges.html'

})
export class MyChallengesPage {

	challenges:any [];
  pendingChallenges: any [];
  completeChallenges: any [];
	userid: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backendService: BackendService, public authService: AuthService) {
 	this.user = this.authService.getUser();
  this.userid = this.user.userid;
  this.getChallenges(this.userid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChallenges');
  }


  getChallenges(userid){

    this.pendingChallenges =[];

    console.log('Här är challenges '+ this.userid);
  	this.backendService.getChallenges(userid)
  	.subscribe(data => {
      this.pendingChallenges = (data);
  });
  }

}
