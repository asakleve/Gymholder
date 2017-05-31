import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserLeaderboardPage } from '../user-leaderboard/user-leaderboard';
import { SendChallengePage } from '../send-challenge/send-challenge';

// Här sker import av våra providers
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

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
  profileOwner: any;
  profileId: any;
  radioResult;
  messageA;
  challangeName;
  userid: any;


  // public authService: AuthService & public backendService: BackendService
  // laddar in AuthService ur importen och gör dessa tillgängliga för åtkomst
  // i resten av filen. public är åtkomstnivån, backendService är namnet som
  // sedan används i koden, och BackendService är namnet på klassen (se
  // importer högst upp på sidan).
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private authService: AuthService, private backendService: BackendService) {
    // Hämtar User-objektinstansen från authService, innehållande
    // data för den aktiva användaren.
    this.activeUser = this.authService.getUser();
    if(this.navParams.get('userid') != null ) {
      this.profileId = this.navParams.get('userid');
    } else {
      this.profileId = this.activeUser.userid;
    }
    console.log("This is the navparam userid: " + this.navParams.get('userid'));

    // Hämtar en användare från databasen baserat på @devUserId
    // @param devUserId : variabel för att hålla användarid för
    // en aktiv användare medan utveckling pågår och inloggning
    // ännu ej är färdig.

    this.loadUserData(this.profileId);

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
   this.backendService.getUser(userid)
    .subscribe(data => {
      this.profileOwner = data;
    });

  }

  ionViewDidLoad() {
    // this.activeUser = this.AuthService.getUser();
    console.log('ionViewDidLoad Profile');
  }


  openUserLeaderboard(profileOwner){
    console.log(profileOwner);
    this.navCtrl.push(UserLeaderboardPage, { userid: this.profileOwner });
  }

  sendChallange(){
    this.navCtrl.push(SendChallengePage, {userid: this.profileOwner.userid});
  }



  addFriend(){
    this.backendService.postFriend(this.activeUser.userid,this.profileId)
    .subscribe(data=>{
      if (data==true){
        this.presentToast();
      }      
    })

  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Friend request sent',
      duration: 3000
    });
    toast.present();
  }

  // userChallengedFirstToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'You have challenged Jackie',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  messageSentToast() {
    let toast = this.toastCtrl.create({
      message: 'Message sent',
      duration: 3000
    });
    toast.present();
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