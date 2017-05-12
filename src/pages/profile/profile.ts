import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Results } from '../results/results';
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
testRadioOpen;
testRadioResult;
messageA;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
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

  alert.addInput({
type:'radio',
      label: 'Blue',
      value: 'blue',
      checked: false
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

toResults(){
  this.navCtrl.push(Results);
}

}


  


