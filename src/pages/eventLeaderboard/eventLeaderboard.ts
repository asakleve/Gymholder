import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';



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
      
      this.sports.push("Classic Push Ups");
      this.sports.push("Wide Grip Push Ups");
      this.sports.push("Close Grip Push Ups");
      this.sports.push("Sit Ups");
      this.sports.push("Chin Ups");
      this.sports.push("Pull Ups");
      this.sports.push("One Arm Pull Ups");
      this.sports.push("Toe To Bar");
      this.sports.push("Toe Touch");
      this.sports.push("Squats");
      this.sports.push("Jumping Squats");
      this.sports.push("Wall Squats");
      this.sports.push("Hanging Dips");
      this.sports.push("Box Jumps");
      this.sports.push("Pistol Squats");


      this.results=[];
      //this.sports=[];
      this.backendService.getAllResults()
      .subscribe(data=>{
        this.results=data;
       // this.sports=data.sport;
      });
    }
}
