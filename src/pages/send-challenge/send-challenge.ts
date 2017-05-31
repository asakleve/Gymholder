import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the SendChallange page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-send-challenge',
  templateUrl: 'send-challenge.html',
})
export class SendChallengePage {
  os: string;
  challengeCredentials;
  activeUser;
  profileOwnerId;
  userid;


  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService) {
    this.challengeCredentials={sender: '', receiver: '', sport:'', reps:'',message:''};
    this.activeUser = this.auth.getUser;
    this.profileOwnerId = this.navParams.get('userid');
    this.challengeCredentials.sender = this.activeUser.userid;
    this.challengeCredentials.receiver = this.profileOwnerId;
   
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendChallenge');
  }

<<<<<<< HEAD
  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}


=======
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Challenges explained!',
    subTitle: '',
    buttons: ['Ok']
  });
  alert.present();
}


  engage(){
    // this.sports[];
    
    this.backendService.getAllSports()
    .subscribe(data => {
      for(let s of data) {
        this.sports.push(s.name);
        }
      });
  }
showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Challenges explained!',
      subTitle: 'Start by writing the exercise you want your friend to do. Then choose how many repetitions you want him or her to do and click on “Send”. Now it’s time to enter a name for the challenge and click on “send”. If you change your mind you can always choose to cancel.',
      buttons: ['OK']
    });
    alert.present();
  }
>>>>>>> master

doPrompt() {
  let prompt = this.alertCtrl.create({
    title: 'Awesome!',
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send Challenge',
        handler: data => {
          console.log('Saved clicked');
          this.postChallenge();
            }
         }
        
    ]
  });
  prompt.present();
}

postChallenge(){
  this.backendService.postChallenge(this.challengeCredentials.sender, this.profileOwnerId, this.challengeCredentials.sport, this.challengeCredentials.reps, this.challengeCredentials.message)
  .subscribe(data=>{
     if (data=="Challenge created"){
      this.showAlert();

    }
   });
}


<<<<<<< HEAD
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Challenge sent!',
      buttons: ['Cancel' , 'OK']
    });
    alert.present();
  }
=======
  //  showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Challenge sent!',
  //     subTitle: 'Your challange:' + this.challangeName + ' where you challenge ' + this.profileOwner.username + ' in '+ this.radioResult + ' has been sent. She has seven days to accept the challenge',
  //     buttons: ['Cancel' , 'OK']
  //   });
  //   alert.present();
  // }
>>>>>>> master
          //Väntar på HTML-förändringar innan denna kan färdigställas/ åsa

}