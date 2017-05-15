import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { CoordService } from '../../providers/coord-service';


export class Gym {
  name: string;
  lat: number;
  lon: number;

  constructor(name: string, lat: number, lon: number) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
  }
}

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

  pos: any;
  gymData: any;
  processedGymData: Array<Gym> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private openGymData: OpenGymDataService, private coordService: CoordService) {
    this.loadGyms();
  }

  loadGyms() {
    // Hämta data från api.stockholm.se och mappa till gymData.
    this.openGymData.loadGymData()
    // När hämtningen är klar, kör en for-loop och konvertera rt90 till lat/long.
    .subscribe(data => {
      this.gymData = data;
      for(let data of this.gymData) {
        this.pos = this.coordService.gridToGeodetic(data.GeographicalPosition.X, data.GeographicalPosition.Y);
        this.processedGymData.push(new Gym(data.Name, this.pos.lat, this.pos.lon));
      }
    });
      /* processedGymData.push({ value.name, pos.lat, pos.lon }); */
      /* this.push(key + ': ' + value); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
  }

}
