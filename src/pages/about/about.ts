import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }
  showPrompt() {
  let prompt = this.alertCtrl.create({
    title: 'Challenges explained!',
    message: "Start by writing the exercise you want your friend to do. Then choose how many repetitions you want him or her to do and click on “Send”. Now it’s time to enter a name for the challenge and click on “send”. If you change your mind you can always choose to cancel. ",
    
    buttons: [
      {
        text: 'OK',
  
       }  
    ]
  });
  prompt.present();
}

showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Challenges explained!',
      subTitle: 'Start by writing the exercise you want your friend to do. Then choose how many repetitions you want him or her to do and click on “Send”. Now it’s time to enter a name for the challenge and click on “send”. If you change your mind you can always choose to cancel.',
      buttons: ['OK']
    });
    alert.present();
  }

showAlerts() {
    let alert = this.alertCtrl.create({
      title: 'Badass explained!',
      subTitle: 'Badass is the scoring system of the Gymholder app. Depending on the weather condition you can get different score of your workout. The purpose of the badass scoring system is to generate higher scores for people who dare to challenge severe weather. It is way more badass to exercise in a thunderstorm than to workout in sunshine.',
      buttons: ['OK']
    });
    alert.present();
  }  


}
