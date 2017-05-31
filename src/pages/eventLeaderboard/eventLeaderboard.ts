import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';



@IonicPage()
@Component({
  selector: 'page-eventLeaderboard',
  templateUrl: 'eventLeaderboard.html',
})
export class EventLeaderboardPage {

  sport;
  selectedSport;
  sports: any[];
  results: any[];
  displayResults: any[];
  testResult: any;
  user: any;
  id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService, public loadingCtrl: LoadingController) {
    this.sports = [];
    this.sports.push("Show all results");
    this.engage();
    this.showResults("Show all results");
    this.presentLoading();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventLeaderboard');
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
      if( sport == "Show all results" || sport == undefined ){
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
   
    engage(){
         this.backendService.getAllSports()
      .subscribe(data => {
        for(let s of data) {
          this.sports.push(s.name);
        }
      });

      this.results=[];
      this.backendService.getAllResults()
      .subscribe(data=>{
        this.results=data;
     
      });
    }

      toHomepage(){
  this.navCtrl.setRoot(HomePage);

     openProfile(username: string){
      
      this.backendService.getUserByUsername(username)
      .subscribe(data=>{
        this.id = data.id;
            console.log("this is from leaderbard" + this.id);
    this.navCtrl.push(ProfilePage, { userid: this.id });
      })
  }
}
}