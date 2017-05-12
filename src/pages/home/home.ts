import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { CoordService } from '../../providers/coord-service';
// import * as CoordinateHandler from '../../CoordinateHandler.js';

import { MapPage } from '../map/map';
import { EventLeaderboardPage } from '../eventLeaderboard/eventLeaderboard';
import { MyChallengesPage } from '../my-challenges/my-challenges';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  gymData: any;

  constructor(public navCtrl: NavController, private auth: AuthService, private openGymData: OpenGymDataService, private coordService: CoordService) {
    // let info = this.auth.getUserInfo();
    // this.email = info['email'];
    this.loadGyms();
    console.log('Homes konstruktor.');
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
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

  loadGyms(){
    this.openGymData.loadGymData()
    .subscribe(data => {
      this.gymData = data;
    });
    console.log('Gymdata har kört klart.');
  }

  ionViewDidLoad() {
    console.log('Home har laddat.');
  }

}
