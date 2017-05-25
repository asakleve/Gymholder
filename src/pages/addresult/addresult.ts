import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { BackendService } from '../../providers/backend-service';

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
  createSuccess = false;
  sports: any;
  opengymid: any;
  gymid: any;
  registerResult = { user: '', gym: '', sport: '', value: '' };

  constructor(public auth: AuthService, public backendService: BackendService, private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sports = this.navParams.get('sports');
    this.opengymid = this.navParams.get('opengymid');
    console.log("addresult.constructor: " + this.opengymid);
    this.backendService.getAllGyms()
      .subscribe(data => {
        for(let s of data) {
          if(s.eid == this.opengymid) {
            console.log("         addresult.data.s.id: " + s.id);
            this.gymid = s.id;
          }
        }
        this.registerResult.gym = this.gymid;
        console.log("addresult: Gym id: " + this.gymid);
      });
    this.registerResult.user = this.navParams.get('userid');
  }

  close() {
    this.viewCtrl.dismiss();
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
        if(this.createSuccess) {
          this.navCtrl.popToRoot();
        }
        this.showAlert();
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

}
