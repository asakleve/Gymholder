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
  // devUserId = 18;

  // Denna variabel håller aktiv användare
  activeUser: any;
  viewingUserid: any;
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
    this.viewingUserid = this.navParams.get('userid');
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
    var labels = [];
    var allSports: any;
    this.backendService.getAllSports()
      .subscribe(data => {
        console.log(JSON.stringify(data));
        allSports = data;
        for(let s of allSports) {
          alert.addInput({type: 'radio', label: s.name, value: s.name});
        }
      });
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
