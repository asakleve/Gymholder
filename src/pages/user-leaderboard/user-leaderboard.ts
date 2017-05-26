import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



@IonicPage()
@Component({
  selector: 'page-user-leaderboard',
  templateUrl: 'user-leaderboard.html'
})
export class UserLeaderboardPage {
  sport;
  selectedSport;
  sports: any[];
  results: any[];
  displayResults: any[];
  activeUser: any;
  testResult: any;
  userid: any;
  video;

  


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService,  private authService: AuthService, private youtube: YoutubeVideoPlayer) {
    
    this.activeUser = this.authService.getUser();
    this.userid = this.navParams.get('userid');
    this.sports = [];
    this.engage();
    this.sports.push("Show all results");
    this.video = "https://www.youtube.com/embed/2L3gFYWU3hs";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLeaderboard');
  }

  playVideo(){
  console.log(this.userid);
  this.youtube.openVideo('myvideoid');
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

    //måste lägga till felhantering av om "sport" inte är valt
  }


  engage(){
    this.backendService.getAllSports()
      .subscribe(data => {
        for(let s of data) {
          this.sports.push(s.name);
        }
      });

    this.results=[];

    console.log("In engage: " + this.userid);
    this.backendService.getResult(this.userid)
      .subscribe(data => {
        this.results = data[0];
        this.showResults("Show all results");
        //behöver fixa en loop som lägger allt i arrayen. För detta behövs mer och bättre testdata.Går att göra när API returnerar ett array, det gör den inte i dagsläget
      });
  }
}
