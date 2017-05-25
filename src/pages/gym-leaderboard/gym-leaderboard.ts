import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService, public loadingCtrl: LoadingController) {
    this.opengymid = this.navParams.get('opengymid');
    this.backendService.getGymByOpenId(this.opengymid)
      .subscribe(data => {
        console.log(" gym-leaderboard constructor: " + JSON.stringify(data.id));
        this.gymid = data.id;
        this.sports = [];
        this.sports.push("Show all results");
        this.engage();
        this.showResults("Show all results");
        this.presentLoading();
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
        return parseFloat(a.reps) - parseFloat(b.reps);
      });
    }
      //Ovan funkar inte eftersom namnen på grenarna inte skrivs i API, kollen blir alltså mot siffror istället = knasigt//

    engage(){

      this.sports.push("Chins");
      this.sports.push("Dips");
      this.sports.push("Boxjump");
      this.sports.push("Knäböj");
      this.sports.push("Axelpress");
      this.sports.push("Marklyft");
      this.sports.push("Situps");
      this.sports.push("Bänkpress");

      this.results=[];
      //this.sports=[];
      this.backendService.getGymResults(this.gymid)
      // .subscribe(data=>{
      //   this.results=data;

      .subscribe(data => {
       	this.results.push(data);
       // this.sports=data.sport;
      });
    }

}
