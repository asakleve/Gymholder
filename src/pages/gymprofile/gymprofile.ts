import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GymLeaderboardPage } from '../gym-leaderboard/gym-leaderboard';
import { OpenGymDataService } from '../../providers/open-gym-data-service';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { AddresultPage } from '../addresult/addresult';
import { BadassPage } from '../badass/badass';
import { HomePage } from '../home/home';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
 * Generated class for the Gymprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gymprofile',
  templateUrl: 'gymprofile.html',
})
export class GymprofilePage {

  activeUser: any;
  activeGym: any;
  coordinates: any;
  gymData: any;
  opengymid: string;
  gymid: number;
  gymImageId: string;
  time: any;
  pcat: any;
  weathercat: any;
  allsports: any;
  gymHolder;

  constructor(private authService: AuthService, public navCtrl: NavController, public navParams: NavParams, private openGymData: OpenGymDataService, private backendService: BackendService) {

    this.pcat = {
      0 : "No precipitation",
      1 :	"Snow",
      2 :	"Snow and rain",
      3	: "Rain",
      4	: "Drizzle",
      5 :	"Freezing rain",
      6 :	"Freezing drizzle"
    };

    this.weathercat = {
      1	: "Clear sky",
      2	: "Nearly clear sky",
      3	: "Variable cloudiness",
      4	: "Halfclear sky",
      5	: "Cloudy sky",
      6	: "Overcast",
      7	: "Fog",
      8	: "Rain showers",
      9	: "Thunderstorm",
      10 : "Light sleet",
      11 : "Snow showers",
      12 : "Rain",
      13 : "Thunder",
      14 : "Sleet",
      15 : "Snowfall"
    }

    this.backendService.getAllSports()
      .subscribe(data => {
        this.allsports = data;
      });


    this.time = new Date().getHours();
    this.opengymid = this.navParams.get('openid');

    this.backendService.getGymByOpenId(this.opengymid)
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.gymid = data.id;
      });

    this.activeUser = this.authService.getUser();
    this.activeGym = this.navParams.get('gym');
    this.loadGymDetails();

    this.backendService.getGymHolder(this.activeGym.id)
    .subscribe(data=>{
      this.gymHolder=data;
      console.log(JSON.stringify(data));
      console.log(this.gymHolder.username);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gymprofile');
  }

  // startRecording(options) {
  //   this.mediaCapture.captureVideo((videodata) => {
  //     alert(JSON.stringify(videodata));
  //    })
  // }

  openLeaderBoard() {

  	this.navCtrl.push(GymLeaderboardPage, { opengymid: this.opengymid, gymid: this.gymid, sports: this.allsports });
  }

  openAddResult() {
    console.log(JSON.stringify(this.allsports));
    this.navCtrl.push(AddresultPage, { opengymid: this.opengymid, opengymData: this.gymData, sports: this.allsports, userid: this.activeUser.userid });
  }

  openBadass() {
    console.log("Till funktionen openbadass");
    this.navCtrl.push(BadassPage, { opengymData: this.gymData });
  }

  getForecast() {
    this.openGymData.getForecast(Math.round(this.activeGym.position.lon * 1000)/1000, Math.round(this.activeGym.position.lat * 1000)/1000)
    .subscribe(data => {
      this.gymData.forecast = data.timeSeries[6].parameters;
      console.log(JSON.stringify(this.gymData.forecast));
      this.gymData.forecast.temperature = this.gymData.forecast[1].values[0];
      this.gymData.forecast.windspeed = this.gymData.forecast[4].values[0];
      this.gymData.forecast.thunderprob = this.gymData.forecast[6].values[0];
      this.gymData.forecast.precipitationcat = this.gymData.forecast[15].values[0];
      this.gymData.forecast.weathersymbol = this.gymData.forecast[18].values[0];
    });
  }

  loadResults() {
    this.backendService.getGymResults(this.gymid)
    .subscribe(data => {
      this.gymData.results = data;
      // console.log(this.gymData.results);
      // this.gymData.gymholder = this.gymData.results[0];
      // this.gymData.gymholder = MyApp.authService.getUser();
    });
  }

  loadGymDetails() {
    this.openGymData.loadGymDetails(this.opengymid)
    .subscribe(data => {
      this.gymData = data;
      this.loadGymImage();
      this.getForecast();
      //this.loadResults();
    });
  }

  loadGymImage() {
    // Sätt backup-bild ifall något gym saknar bild.
    this.gymImageId = "87f931b5-5da6-4078-b706-3681a4e0d1be";
    // Kolla igenom attributen för gymmet och se ifall det finns en bild;
    // isf hämta bild-id och ersätt backup-bildens id.
    for(let a of this.gymData.Attributes) {
      if(a.Id == "Image") {
        this.gymImageId = a.Value.Id;
      }
    }
    // Förbered URL för användning.
    this.gymData.gymImage = 'http://www.stockholm.se/Web/Core/Pages/Special/StreamServiceGuideImage.aspx?path=%2fWeb%2fCore%2fPages%2fSpecial%2fServiceGuideFile.aspx%3ffileid%3d' + this.gymImageId;
  }
  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
}