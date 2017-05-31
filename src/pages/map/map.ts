import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GymprofilePage } from '../gymprofile/gymprofile';
import { BackendService } from '../../providers/backend-service';
import {Geolocation} from '@ionic-native/geolocation';
import { HomePage } from '../home/home';


/*

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
*/

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

  allgyms: any;
  activeGym: any;
  processedallgyms: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private backendService: BackendService, private geolocation: Geolocation) {
    this.allgyms = this.backendService.getAllGyms();
    console.log("MapPage.constructor: " + JSON.stringify(this.allgyms));
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

    // console.log("    >>>   Stringified allgyms " + JSON.stringify(this.allgyms));

    for(let i = 0; i < this.allgyms.length; i++) {
      if(this.allgyms[i] !== undefined) {
        // console.log("loadGyms.for.data: " + gym.name, gym.description, gym.position.lat, gym.position.lon, gym.openid);
        this.addMarker(
          this.allgyms[i].name,
          this.allgyms[i].description,
          this.allgyms[i].position.lat,
          this.allgyms[i].position.lon,
          this.allgyms[i].openid,
          this.allgyms[i]
        );
      }
    }

  }


  addMarker(name: string, text:string, x: number, y: number, id: string, gym: any) {
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
        this.lastMarker.infoWindow.close();
        this.navCtrl.push(GymprofilePage, { openid: id, gym: gym });
      }, false);
    });
  }


  //   watch() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
  //     this.accuracy = resp.coords.accuracy + ' meters';
  //   }).catch((error) => {
  //     this.error = 'Error getting location: ' + error;
  //   });
  // }



  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}

}
