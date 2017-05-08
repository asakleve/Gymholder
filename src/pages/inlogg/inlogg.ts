import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-inlogg',
  templateUrl: 'inlogg.html'
})
export class InloggPage {


  constructor(public navCtrl: NavController) {
     }


     dummyLogin(){
     	this.navCtrl.setRoot(HomePage);

     }


}
