import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GymprofilePage } from '../gymprofile/gymprofile';

import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { CoordService } from '../../providers/coord-service';

import {Geolocation} from '@ionic-native/geolocation'

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


  coords: any;
  accuracy: any;
  error: any;

  lastMarker: any;
  pos: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  gymData: any;
  activeGym: any;
  processedGymData: Array<Gym> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private openGymData: OpenGymDataService, private coordService: CoordService, private geolocation: Geolocation) {
    /*if(this.navParams.get("gymId")) {
      this.loadGym(this.navParams.get("gymId"));
    } else {*/
      this.loadGyms();
    //}
  }

  loadGyms() {
    // Hämta data från api.stockholm.se och mappa till gymData.
    this.openGymData.loadGymData()
    // När hämtningen är klar, kör en for-loop och konvertera rt90 till lat/long.
    .subscribe(data => {
      this.gymData = data;
      for(let data of this.gymData) {
        this.loadGymDetails(data);
      }
    });
      /* processedGymData.push({ value.name, pos.lat, pos.lon }); */
      /* this.push(key + ': ' + value); */
  }

  loadGymDetails(data) {
    this.openGymData.loadGymDetails(data.Id)
      .subscribe(res => {
        var attrib = "Beskrivning saknas för detta gym.";
        this.activeGym = res;
        this.pos = this.coordService.gridToGeodetic(data.GeographicalPosition.X, data.GeographicalPosition.Y);
        this.processedGymData.push(new Gym(data.Name, this.pos.lat, this.pos.lon));
        for(let a of res.Attributes) {
          if(a.Id == "ShortDescription") {
            attrib = a.Value;
          }
        }
        this.addMarker(data.Name, attrib, this.pos.lat, this.pos.lon, data.Id);
      });
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


  addMarker(name: string, text:string, x: number, y: number, id: string) {
    let marker = new google.maps.Marker({
      map: this.map,
      /*animation: google.maps.Animation.DROP,*/
      position: new google.maps.LatLng(x, y)
    });
    marker.infoWindow = new google.maps.InfoWindow({

      content: '<div id="content">'
      + '<p class="infoWinHeader">' + name + '</p>'
      + '<p class="infoWinBody">' + text + '</p>'
      + '</div>'

    });
    google.maps.event.addListener(marker, 'click', () => {
      if(this.lastMarker != null) {
        this.lastMarker.infoWindow.close();
      }
      marker.infoWindow.open(this.map, marker);
      console.log(id);
      this.lastMarker = marker;
    });
    google.maps.event.addListener(marker.infoWindow, 'domready', () => {
      document.getElementById('content').addEventListener('click', () => {
        this.navCtrl.push(GymprofilePage, {id: id, coordinates: this.pos });
      }, false);
    });
  }

    watch() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
      this.accuracy = resp.coords.accuracy + ' meters';
    }).catch((error) => {
      this.error = 'Error getting location: ' + error;
    });
  }


}
