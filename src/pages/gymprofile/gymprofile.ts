import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GymLeaderboardPage } from '../gym-leaderboard/gym-leaderboard';

/**
 * Generated class for the Gymprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gymprofile',
  templateUrl: 'gymprofile.html',
})
export class GymprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gymprofile');
  }

  openLeaderBoard(){
  	this.navCtrl.push(GymLeaderboardPage);
  }

}
