import { Component, ViewChild, ElementRef } from '@angular/core';
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

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  lastMarker: any;
  pos: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

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
        this.addMarker(data.Name, this.pos.lat, this.pos.lon);
      }
    });
      /* processedGymData.push({ value.name, pos.lat, pos.lon }); */
      /* this.push(key + ': ' + value); */
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(59.307890, 18.012877);

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }


  addMarker(name: string, x: number, y: number) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(x, y)
    });
    marker.infoWindow = new google.maps.InfoWindow({
      content: '<p class="infoWinHeader">' + name + '</p></br>'
      + '<p class="infoWinBody">Here be text and shit. Arrr.</p>'
    });
    google.maps.event.addListener(marker, 'click', () => {
      if(this.lastMarker != null) {
        this.lastMarker.infoWindow.close();
      }
      marker.infoWindow.open(this.map, marker);
      this.lastMarker = marker;
    });
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });


  }

}
