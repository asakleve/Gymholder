import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { BackendService } from '../../providers/backend-service';
import { HomePage } from '../home/home';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VideoPlayer } from '@ionic-native/video-player';


/**
 * Generated class for the Addresult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addresult',
  templateUrl: 'addresult.html',
})
export class AddresultPage {

@ViewChild('myvideo') myvideo: any;


  createSuccess = false;
  opengymid: any;
  gymid: any;
  registerResult;
  video:any;
  activeUser;
  sportsArray: any[];
  sport;
  reps;
  result;
  sportId;
  sports:any[];

  //myvideo:any;
  // imageData:any;
  // safeUrl;
  // fileEntry;
  // user;
  // playVideo;


  constructor(public auth: AuthService, public backendService: BackendService, private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture, private camera: Camera,
    private domSanitizer: DomSanitizer, private videoPlayer: VideoPlayer) {
    this.result = { sport:'', reps: ''};

    this.sports = this.navParams.get('sports');

    this.opengymid = this.navParams.get('opengymid');
    console.log("addresult.constructor: " + this.opengymid);
    this.backendService.getGymByOpenId(this.opengymid)
      .subscribe(data => {
        this.gymid.gym = data;
      }); 
    this.activeUser = this.auth.getUser();
    this.engage();
    this.sport="Exercise";
    this.reps = 10;
  }

  showRadio() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Select exercise');

    for(let i=0; i<this.sportsArray.length;i++){
      alert.addInput({
        type: 'radio',
        label: this.sportsArray[i],
        value: this.sportsArray[i],
        checked: false
      });

    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.showSport(data);
      }
    });
    alert.present();
  }

  showSport(sport){
    this.sport = sport.toLowerCase()


  }


  engage(){
    this.sportsArray = [];
    this.backendService.getAllSports()
      .subscribe(data => {
        for(let s of data) {
          this.sportsArray = (s.name + s.id);
          // this.sportsArray = (data);
        }
      });
   }   

  close() {
    this.viewCtrl.dismiss();
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addresult');
  }


  addResult(){
    this.backendService.postResult(this.activeUser.userid, this.gymid.gym, this.sport, this.result.reps)
      .subscribe(data=>{
     if (data=="true"){
      this.showAlert();

    }
   });
}
   showAlert() {
   let alert = this.alertCtrl.create({
     title: 'Result added!',
     buttons: ['OK']
   });
   alert.present();

 }
  toHomepage(){
  this.navCtrl.setRoot(HomePage);
}
}


// }