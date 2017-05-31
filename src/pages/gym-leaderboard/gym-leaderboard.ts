import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the GymLeaderBoard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gym-leaderboard',
  templateUrl: 'gym-leaderboard.html',
})
export class GymLeaderboardPage {

	sport;
	selectedSport;
 	sports: any[];
 	results: any[];
 	displayResults: any[];
 	gymData: any
  gymid: number;
  opengymid: string;

  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService, public loadingCtrl: LoadingController) {
    this.opengymid = this.navParams.get('opengymid');
    this.backendService.getGymByOpenId(this.opengymid)
      .subscribe(data => {
        this.gymid = data.id;
        this.sports = [];
        this.sports.push("Show all results");
        this.engage();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GymLeaderBoard');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select exercise');

    for(let i=0; i<this.sports.length;i++){
      alert.addInput({
        type: 'radio',
        label: this.sports[i],
        value: this.sports[i],
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.showResults(data);
      }
    });
    alert.present();
  }


    showResults(sport){
      this.displayResults=[];
      if(sport==="Show all results"){
        this.displayResults = this.results;
        this.selectedSport = "all exercises";
      }
      else{
        this.selectedSport = sport.toLowerCase();
      }
      for(let i=0;i<this.results.length;i++){
        if (this.results[i].sport===sport){
          this.displayResults.push(this.results[i]);
        }
      }
      this.displayResults.sort(function(b, a) {
        return parseFloat(a.value) - parseFloat(b.value);
      });
    }
      //Ovan funkar inte eftersom namnen på grenarna inte skrivs i API, kollen blir alltså mot siffror istället = knasigt//

    engage(){
      let allsports = this.navParams.get('sports');
      for(let s of allsports) {
        this.sports.push(s.name);
      }
      this.results=[];
      //this.sports=[];
      this.backendService.getGymResults(this.gymid)
        .subscribe(data => {
          for(let d of data) {
            for(let s of allsports) {
              if(s.id == d.sport) {
                d.sport = s.name;
              }
            }
            this.backendService.getUser(d.user)
              .subscribe(res => {
                d.username = res.username;
                this.results.push(d);
              });
          }
          this.presentLoading();
          this.showResults("Show all results");
        });
    }
  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
}