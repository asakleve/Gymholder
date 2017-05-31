import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-inlogg',
  templateUrl: 'inlogg.html'
})
export class InloggPage {
    loading :Loading;
    registerCredentials = { email: '', password: '' };
    FB_APP_ID: number = 1575498892474159;


  constructor(public nav: NavController, public menu: MenuController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, 
    private facebook: Facebook, private nativeStorage: NativeStorage) {
    this.facebook.browserInit(this.FB_APP_ID, "v.28");
    this.menu.enable(false);
  }



  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      console.log("This is the allowed status: " + allowed);
      if (allowed) {
        this.nav.setRoot(HomePage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  dummyLogin(){
    this.nav.setRoot(HomePage);
  }

  doFB(){

    let permissions = new Array<string>();
    let nav = this.nav;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(HomePage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }
  


}
