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

	challanges:any [];
	userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backendService: BackendService, public authService: AuthService) {

 	this.getChallanges();
 	this.userid = this.authService.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChallenges');
  }


  getChallanges(){
  	this.backendService.getChallanges(this.userid)
  	.subscribe(data => {
      this.challanges.push(data);
  });
  }

}
