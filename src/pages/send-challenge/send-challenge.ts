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
    this.activeUser = this.auth.getUser();
    this.profileOwnerId = this.navParams.get('userid');
    console.log(this.profileOwnerId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendChallenge');
  }


  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}

postChallenge(){
  this.backendService.postChallenge(this.activeUser.userid, this.profileOwnerId.id, this.challengeCredentials.sport,this.challengeCredentials.reps, this.challengeCredentials.message)
  .subscribe(data=>{
     if (data=="Challenge created"){
      this.showAlert();

    }
   });
}
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Challenge sent!',
      buttons: ['Cancel' , 'OK']
    });
    alert.present();
  }
}