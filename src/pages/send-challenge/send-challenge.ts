import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';


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
  sports: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private backendService: BackendService) {
    this.engage();
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendChallenge');
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
          // this.backendService.postchallenge(sender:activeUser.id, receiver: userid, sport: )
          // .subscribe(data=>{
          //    if (data==true){
          //      this.showAlert();
          //     }
          //  }
          //Väntar på HTML-förändringar innan denna kan färdigställas/ åsa
          } 
       }  
    ]
  });
  prompt.present();
}


  //  showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Challenge sent!',
  //     subTitle: 'Your challange:' + this.challangeName + ' where you challenge ' + this.profileOwner.username + ' in '+ this.radioResult + ' has been sent. She has seven days to accept the challenge',
  //     buttons: ['Cancel' , 'OK']
  //   });
  //   alert.present();
  // }
          //Väntar på HTML-förändringar innan denna kan färdigställas/ åsa

}
