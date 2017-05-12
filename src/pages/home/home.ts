import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
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

  constructor(public navCtrl: NavController, private auth: AuthService, private menu: MenuController) {
    // let info = this.auth.getUserInfo();
    // this.email = info['email'];
    this.menu.enable(true);
    console.log('Homes konstruktor.');
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }

  openMapPage(){
    this.navCtrl.push(MapPage);
  }

  openEventLeaderboardPage(){
    this.navCtrl.setRoot(EventLeaderboardPage);
  }

  openMyChallengesPage(){
    this.navCtrl.setRoot(MyChallengesPage);
  }

  ionViewDidLoad() {
    console.log('Home har laddat.');
  }

}
