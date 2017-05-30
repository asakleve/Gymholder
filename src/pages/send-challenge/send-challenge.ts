import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



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


  musicAlertOpts: { title: string, subTitle: string };


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  this.musicAlertOpts = {
       title: '1994 Music',
       subTitle: 'Select your favorite'
     };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendChallenge');
  }
  stpSelect() {
  console.log('STP selected');
}
doPrompt() {
  let prompt = this.alertCtrl.create({
    title: 'Awesome!',
    message: "Now enter a name for this new challenge you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
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
        }
      }
    ]
  });
  prompt.present();
}


}
