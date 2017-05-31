import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { BackendService } from '../../providers/backend-service';
import { HomePage } from '../home/home';
import { MediaCapture, MediaFile, CaptureError} from '@ionic-native/media-capture';
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
  sports: any;
  opengymid: any;
  gymid: any;
  registerResult;
  video:any;
  //myvideo:any;
  imageData:any;
  safeUrl;
  fileEntry;
  user;
  playVideo;

  constructor(public auth: AuthService, public backendService: BackendService, private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture, private camera: Camera,
    private domSanitizer: DomSanitizer, private videoPlayer: VideoPlayer) {
    this.registerResult = { user: '', gym: '', sport: '', value: '' };
    this.sports = this.navParams.get('sports');
    this.opengymid = this.navParams.get('opengymid');
    console.log("addresult.constructor: " + this.opengymid);
    this.backendService.getGymByOpenId(this.opengymid)
      .subscribe(data => {
        this.registerResult.gym = data;
      }); 
  }


  close() {
    this.viewCtrl.dismiss();
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addresult');
  }

  public add() {
    console.log("add() has these registerResults: " + JSON.stringify(this.registerResult));
    this.addResult(this.registerResult).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Result added.");
        this.navCtrl.popToRoot();
      } else {
        this.showPopup("Error", "Problem adding result.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  public addResult(credentials) {
    if (credentials.sport === null || credentials.value === null) {
      return Observable.throw("Input data");
    } else {
      // At this point store the credentials to your backend!
      this.backendService.postResult(credentials.user, credentials.gym, credentials.sport, credentials.value)
        .subscribe(data => {
          console.log("this is the add result-data: " + JSON.stringify(data));
        });
      return Observable.create(observer => {
       observer.next(true);
       observer.complete();
      });
    }
  }

  showPopup(title, text) {
    var labels = [];
    let alert = this.alertCtrl.create();
    alert.setTitle(title);
    for(let s of this.sports) {
      alert.addInput({ type: 'radio', label: s.name, value: s.name })
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(!this.createSuccess) {
          this.showAlert();
        }
        this.navCtrl.popToRoot();
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


// function videoCapture() {

//    var options = {
//       limit: 1,
//       duration: 10
//    };

//    navigator.device.capture.captureVideo(onSuccess, onError, options);

//    function onSuccess(mediaFiles) {
//       var i, path, len;
    
//       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//          path = mediaFiles[i].fullPath;
//          console.log(mediaFiles);
//       }
//    }

//    function onError(error) {
//       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
//    }
  
// }



   startRecording(){
    this.mediaCapture.captureVideo()
    .then(
      (data: MediaFile [])=> console.log (data),
      (err: CaptureError) => console.error(err)
      );
  
    
   
  }

// //testfunktion
//   playResultVideo(){
//     this.backendService.getResultVideo(18)
//       .subscribe(data=>{ 
//       this.playVideo = (data.src);
//     });
     

//      this.videoPlayer.play(this.playVideo);
//   }


//   selectVideo(){
//     let video = this.myvideo.nativeElement;
//     var options = {
//       sourceType:2,
//       mediaType:1
//     };
//     this.camera.getPicture(options).then((data)=>
//       video.src = data);
//       //this.safeUrl = this.domSanitizer.bypassSecurityTrustUrl(this.fileEntry.nativeURL));
//       video.play();

//   } 

}