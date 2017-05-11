import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from '../map/map';
import {EventLeaderboardPage} from '../eventLeaderboard/eventLeaderboard';
import {MyChallengesPage} from '../my-challenges/my-challenges';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
openMapPage(){
this.navCtrl.setRoot(MapPage);
}

openEventLeaderboardPage(){
this.navCtrl.setRoot(EventLeaderboardPage);
}

openMyChallengesPage(){
this.navCtrl.setRoot(MyChallengesPage);
}

}
