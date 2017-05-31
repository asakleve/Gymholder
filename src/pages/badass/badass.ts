import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserLeaderboardPage } from '../user-leaderboard/user-leaderboard';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

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

  // Tas bort när inloggning är färdigimplementerad.
  devUserId = 18;

  // Denna variabel håller aktiv användare
  activeUser: any;
  gymData: any;
  // testRadioOpen;
  radioResult;
  messageA;
  challangeName;
  badassMult = 0;
  tMult = 0;
  pMult = 0; 
  wMult = 0;


  // public authService: AuthService & public backendService: BackendService
  // laddar in AuthService ur importen och gör dessa tillgängliga för åtkomst
  // i resten av filen. public är åtkomstnivån, backendService är namnet som
  // sedan används i koden, och BackendService är namnet på klassen (se
  // importer högst upp på sidan).
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: 
    AlertController, public toastCtrl: ToastController, private authService: AuthService,
     private backendService: BackendService) {
    // Hämtar User-objektinstansen från authService, innehållande
    // data för den aktiva användaren.
    this.gymData = this.navParams.get('gymData');
    this.activeUser = this.authService.getUser();

    // Hämtar en användare från databasen baserat på @devUserId
    // @param devUserId : variabel för att hålla användarid för
    // en aktiv användare medan utveckling pågår och inloggning
    // ännu ej är färdig.
    this.loadUserData(this.devUserId);
    this.calcBadassMult(); 
  }

  // Metod som laddar användardata från backendService. Som argument
  // tas "number" (https://www.w3schools.com/js/js_numbers.asp) och
  // skickas sedan med vid anrop av metoden "getUser(userid:number)"
  // i provider/backend-service.ts
  //
  // .subscribe(data => { ... }) skapar en prenumeration på datan som
  // levereras från backendService.getUser() och gör den tillgänglig
  // när hämtningen från api är klar; detta krävs eftersom hämtningen
  // från api tar tid att färdigställas, och koden annars inte väntar
  // på att läsningen ska köras klart.
  loadUserData(userid: number) {
    this.activeUser = this.backendService.getUser(userid)
    .subscribe(data => {
      this.activeUser = data;
    });
  }

  ionViewDidLoad() {
    // this.activeUser = this.AuthService.getUser();
    console.log('ionViewDidLoad Profile');
  }

  openUserLeaderboard(){
    this.navCtrl.push(UserLeaderboardPage);
  }

  showChallangeTitel(){
  
    let prompt = this.alertCtrl.create({
      title: 'Challange',
      message: "Give your challange a name:",
      inputs: [
        {
          name: 'challangeName',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            this.challangeName = data.challangeName;
            this.showRadio();
          }
        }
      ]
    });
    prompt.present();
  }

  showAddVideo(){

  }

  showRadio() {
    let alert = this.alertCtrl.create();

    alert.setTitle('Exercise');
    alert.addInput({type: 'radio', label: 'Classic Push Ups', value: 'Classic Push Ups'});
    alert.addInput({type: 'radio', label: 'Wide Grip Push ups', value: 'Wide Grip Push Ups'})
    alert.addInput({type: 'radio', label: 'Close Grip Push Ups', value: 'Close Grip Push Ups'})
    alert.addInput({type: 'radio', label: 'Sit Ups', value: 'Sit Ups'})
    alert.addInput({type: 'radio', label: 'Chin Ups', value: 'Chin Ups'})
    alert.addInput({type: 'radio', label: 'Pull Ups', value: 'Pull Ups'})
    alert.addInput({type: 'radio', label: 'One Arm Pull Ups', value: 'One Arm Pull Ups'})
    alert.addInput({type: 'radio', label: 'Toe To Bar', value: 'Toe To Bar'})
    alert.addInput({type: 'radio', label: 'Toe Touch', value: 'Toe Touch'})
    alert.addInput({type: 'radio', label: 'Squats', value: 'Squats'})
    alert.addInput({type: 'radio', label: 'Jumping Squats', value: 'Jumping Squats'})
    alert.addInput({type: 'radio', label: 'Wall Squats', value: 'Wall Squats'})
    alert.addInput({type: 'radio', label: 'Hanging Dips', value: 'Hanging Dips'})
    alert.addInput({type: 'radio', label: 'Box Jumps', value: 'Box Jumps'})
    alert.addInput({type: 'radio', label: 'Pistol Squats', value: 'Pistol Squats', checked: false});
    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Next',
      handler: data => {
        this.showAddVideo();
        // this.testRadioOpen = false;
        this.radioResult = data;
        this.showAlert();
        }
      });
    alert.present();
  }


  calcBadassMult() {
    var temperature = this.gymData.forecast.temperature;
    var thunderprob = this.gymData.forecast.thunderprob;
    var windspeed = this.gymData.forecast.windspeed;
    console.log(this.tMult);
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

//   addFriend(){
//     this.backendService.postFriend(activeUser,userToAdd);
// //userToAdd finns inte
//   }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Friend request sent',
      duration: 3000
    });
    toast.present();
  }

  userChallengedFirstToast() {
    let toast = this.toastCtrl.create({
      message: 'You have challenged Jackie',
      duration: 3000
    });
    toast.present();
  }

  messageSentToast() {
    let toast = this.toastCtrl.create({
      message: 'Message sent',
      duration: 3000
    });
    toast.present();
  }

   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Badass explained:',
      subTitle: 'Badass is the scoring system of the Gymholder app. Depending on the weather condition you can get different scores of your workout. The purpose of the badass scoring system is to generate higher scores for people who dare to challenge severe weather. It’s way more badass to exercise in a thunderstorm than to workout in sunshine.',
      buttons: ['OK']
    });
    alert.present();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Send Message',

      inputs: [
        {
          name: 'Message',
          placeholder: 'Message'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Saved clicked');
            this.messageSentToast();
          }
        }
      ]
    });
    prompt.present();
  }
    toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
}