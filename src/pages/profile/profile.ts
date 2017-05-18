import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserLeaderboardPage } from '../user-leaderboard/user-leaderboard';

// Här sker import av våra providers
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // Tas bort när inloggning är färdigimplementerad.
  devUserId = 18;

  // Denna variabel håller aktiv användare
  activeUser: any;
  testRadioOpen;
  testRadioResult;
  messageA;

  // public authService: AuthService & public backendService: BackendService
  // laddar in AuthService ur importen och gör dessa tillgängliga för åtkomst
  // i resten av filen. public är åtkomstnivån, backendService är namnet som
  // sedan används i koden, och BackendService är namnet på klassen (se
  // importer högst upp på sidan).
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private authService: AuthService, private backendService: BackendService) {
    // Hämtar User-objektinstansen från authService, innehållande
    // data för den aktiva användaren.
    this.activeUser = this.authService.getUser();

    // Hämtar en användare från databasen baserat på @devUserId
    // @param devUserId : variabel för att hålla användarid för
    // en aktiv användare medan utveckling pågår och inloggning
    // ännu ej är färdig.
    this.loadUserData(this.devUserId);
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

  showRadio() {
    let alert = this.alertCtrl.create();

    alert.setTitle('Event');
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'});
    alert.addInput({type: 'radio', label: 'Dips', value: 'dips'})
    alert.addInput({type: 'radio', label: 'Box Jump', value: 'boxJump'})
    alert.addInput({type: 'radio', label: 'Sit Ups', value: 'sitUps'})
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'})
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'})
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'})
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'})
    alert.addInput({type: 'radio', label: 'Chins', value: 'chins'})
    alert.addInput({type: 'radio', label: 'Blue', value: 'blue', checked: false});
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.showAlert();
        }
      });
    alert.present();
  }


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
      title: 'Challenge sent!',
      subTitle: 'You have challenged Jackie in chins, she has seven days to accept the challenge',
      buttons: ['Cancel' , 'OK']
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
}
