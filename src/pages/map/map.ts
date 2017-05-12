import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { CoordService } from '../../providers/coord-service';

/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  gymData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private openGymData: OpenGymDataService, private coordService: CoordService) {
    this.loadGyms();
  }

  loadGyms() {
    this.openGymData.loadGymData()
    .subscribe(data => {
      this.gymData = data;
    });
    console.log('loadGyms har kört klart, gymData är laddad.');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
  }

}
