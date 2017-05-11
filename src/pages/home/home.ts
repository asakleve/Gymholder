import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import {MapPage} from '../map/map';
import {EventLeaderboardPage} from '../eventLeaderboard/eventLeaderboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';

  constructor(public navCtrl: NavController, private auth: AuthService) {
    // let info = this.auth.getUserInfo();
    // this.email = info['email'];
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

}
