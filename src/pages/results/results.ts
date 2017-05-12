import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the Results page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class Results {
testRadioOpen;
testRadioResult;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Results');
  }
 showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Sport');

    alert.addInput({
      type: 'radio',
      label: 'Chins',
      value: 'Chins',
      checked: true
    });

    alert.addInput({type: 'radio', label: 'Dips', value: 'Dips'});
    alert.addInput({type: 'radio', label: 'Box Jumps', value: 'Box Jumps'});
    alert.addInput({type: 'radio', label: 'Sit Ups', value: 'Sit Ups'});
    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }
}
