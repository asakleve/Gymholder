import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserLeaderboardPage } from '../user-leaderboard/user-leaderboard';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';

// Här sker import av våra providers


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'badass',
  templateUrl: 'badass.html',
})
export class BadassPage {

  gymData: any;
  badassMult;
  tMult;
  pMult; 
  wMult;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.badassMult = 0;
      this.tMult = 0;
      this.pMult = 0; 
      this.wMult = 0;

    this.gymData = this.navParams.get('opengymData');
    console.log(this.gymData);
    //this.activeUser = this.authService.getUser();

    // Hämtar en användare från databasen baserat på @devUserId
    // @param devUserId : variabel för att hålla användarid för
    // en aktiv användare medan utveckling pågår och inloggning
    // ännu ej är färdig.
   //åsa this.loadUserData(this.devUserId);
    this.calcBadassMult(); 
  }

  // .subscribe(data => { ... }) skapar en prenumeration på datan som
  // levereras från backendService.getUser() och gör den tillgänglig
  // när hämtningen från api är klar; detta krävs eftersom hämtningen
  // från api tar tid att färdigställas, och koden annars inte väntar
  // på att läsningen ska köras klart.




  calcBadassMult() {
    var temperature = this.gymData.forecast.temperature;
    var thunderprob = this.gymData.forecast.thunderprob;
    var windspeed = this.gymData.forecast.windspeed;
    console.log("här är inne i calbadass"+this.tMult);
    if (Math.abs(temperature - 15) > 5) {
      this.tMult = 6;
      if (Math.abs(temperature - 15) > 15)
        this.tMult = 10;
    }
        console.log(this.tMult);

    if (this.gymData.forecast.precipitationcat != 0) {
      switch (this.gymData.forecast.weathersymbol) {
        case 0: case 1: case 2:
        case 3: case 4: case 5:
        case 6:
          break;
        case 7: case 8:
          this.pMult = 4;
          break;
        case 9:
          this.pMult = 10;
          break;
        case 10: case 11: case 12:
          this.pMult = 7;
          break;
        case 13: case 14: case 15:
          this.pMult = 10;
      }
    }
    if (windspeed > 4) {
      this.wMult = 5;
    }
    this.badassMult = 75 + this.tMult + this.pMult + this.wMult;
    }

}
