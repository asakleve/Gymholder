import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesPopOverPage} from '../messages-pop-over/messages-pop-over';
import { HomePage } from '../home/home';

/**
 * Generated class for the Messages page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  openConversation(){
  this.navCtrl.push(MessagesPopOverPage);
  }
    toHomepage(){
  this.navCtrl.setRoot(HomePage);

}
}