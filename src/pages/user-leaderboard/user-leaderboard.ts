import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';


@IonicPage()
@Component({
  selector: 'page-user-leaderboard',
  templateUrl: 'user-leaderboard.html',
})
export class UserLeaderboardPage {
  sport;
  selectedSport;
  sports: any[];
  results: any[];
  displayResults: any[];
  activeUser: any;
  testResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService,  private authService: AuthService) {
    this.activeUser = this.authService.getUser();
    this.sports = [];
    this.sports.push("Show all results");
    this.engage();
    this.showResults("Show all results");
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLeaderboard');
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
      this.backendService.getResult(this.activeUser.userid)
      .subscribe(data => {
        this.results.push(data);
        //behöver fixa en loop som lägger allt i arrayen. För detta behövs mer och bättre testdata. 


    });
}
}