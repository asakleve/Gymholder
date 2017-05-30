import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-inlogg',
  templateUrl: 'inlogg.html'
})
export class InloggPage {
    loading :Loading;
    registerCredentials = { email: '', password: '' };
    FB_APP_ID: number = 1575498892474159;


  constructor(public nav: NavController, public menu: MenuController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private facebook: Facebook) {
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


}
