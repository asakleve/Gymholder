import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';

/**
 * Generated class for the Gymprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gymprofile',
  templateUrl: 'gymprofile.html',
})
export class GymprofilePage {
sport;
testRadioOpen;
testRadioResult;
reps;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gymprofile');
  }

showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Event');
 
alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'});

alert.addInput({type: 'radio', label: 'Dips', value: 'Dips'})
 
alert.addInput({type: 'radio', label: 'Box Jumps', value: 'Box Jumps'})

alert.addInput({type: 'radio', label: 'Sit Ups', value: 'Sit Ups'})

alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'})

alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'})

alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'})

alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'})

alert.addInput({type: 'radio', label: 'Chins', value: 'Chins'})

alert.addInput({ type:'radio', label: 'Blue', value: 'Blue', checked: false}

  );

 alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
      	this.sport=data;
      	
        this.testRadioOpen = false;
        this.testRadioResult = data;
		this.registerResult();
      }
    });
    alert.present();



}

resultRegisteredToast() {
    let toast = this.toastCtrl.create({
      message: 'Result registered',
      duration: 3000
    });
    toast.present();
  }

userChallenged() {
    let toast = this.toastCtrl.create({
      message: 'User challenged',
      duration: 3000
    });
    toast.present();
  }

  registerResult() {
    let prompt = this.alertCtrl.create({
      title: 'Register repetitions for ' + this.sport ,
     
      inputs: [
        {
          name: 'title',
          placeholder: 'Amount of repetitions'
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
          text: 'Save',
          handler: data => {
            this.resultRegisteredToast()
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

/* showAlert() {
	
    let alert = this.alertCtrl.create({
      title:this.sport +'New Friend! ',
      subTitle: this.hej +'You have challenged user' ,
      buttons: ['OK', 'Cancel']

    });
    alert.present();

  }
*/



}
