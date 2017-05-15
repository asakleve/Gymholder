import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { CoordService } from '../../providers/coord-service';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

@ViewChild('map') mapElement: ElementRef;
map: any;

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
    this.loadMap();
  }

    loadMap(){

    let latLng = new google.maps.LatLng(59.40316, 17.94479);

    let mapOptions = {
      center: latLng,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }


  addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Info om platsen!</h4>";

  this.addInfoWindow(marker, content);

}
addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

}
