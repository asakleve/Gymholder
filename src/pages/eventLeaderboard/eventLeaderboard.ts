import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-eventLeaderboard',
  templateUrl: 'eventLeaderboard.html',
})
export class EventLeaderboardPage {
  testRadioOpen;
  testRadioResult;
  sport;
  selectedSport;
  sports: any[];
  results: any[];
  displayResults: any[];



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.sports = [];
    this.sports.push("Show all results");
    this.engage();
    this.showResults("Show all results");
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
          this.testRadioOpen = false;
          this.testRadioResult = data;
          console.log(data);
          this.showResults(data);
          console.log('ok pressed');
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




    engage(){

      this.sports.push("Chins");
      this.sports.push("Dips");
      this.sports.push("Boxjumps");
      this.sports.push("Squats");
      this.sports.push("Shoulder press");
      this.sports.push("Deadlifts");
      this.sports.push("Situps");
      this.sports.push("Bench press");

      this.results=[];
      this.results.push({
        user: 'Anton',
        gym: 'Solviks utegym',
        sport: 'Situps',
        reps: 57
      });


      this.results.push({
        user: 'Anton',
        gym: 'Solviks utegym',
        sport: 'Chins',
        reps: 1
      });

      this.results.push({
        user: 'Maria',
        gym: 'Solviks utegym',
        sport: 'Situps',
        reps: 13
      });

      this.results.push({
        user: 'Lucas',
        gym: 'Solviks utegym',
        sport: 'Situps',
        reps: 85
      });

      this.results.push({
        user: 'Åsa',
        gym: 'Solviks utegym',
        sport: 'Situps',
        reps: 9
     });

     this.results.push({
      user: 'Chris',
      gym: 'Solviks utegym',
      sport: 'Situps',
      reps: 14
     });

     this.results.push({
      user: 'Eyasu',
      gym: 'Solviks utegym',
      sport: 'Situps',
      reps: 57
     });

     this.results.push({
      user: 'Sebastian',
      gym: 'Solviks utegym',
      sport: 'Situps',
      reps: 23
     });

     this.results.push({
      user: 'Jackie',
      gym: 'Solviks utegym',
      sport: 'Situps',
      reps: 46
      });
    }
}
