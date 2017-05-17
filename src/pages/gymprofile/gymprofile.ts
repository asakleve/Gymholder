import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GymLeaderboardPage } from '../gym-leaderboard/gym-leaderboard';
import { OpenGymDataService } from '../../providers/open-gym-data-service';

/**
 * Generated class for the Gymprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gymprofile',
  templateUrl: 'gymprofile.html',
})
export class GymprofilePage {

  gymData: any;
  gymid: string;
  gymImageId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private openGymData: OpenGymDataService) {
    this.loadGymDetails(this.navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gymprofile');
  }

  openLeaderBoard(){
  	this.navCtrl.push(GymLeaderboardPage);
  }

  loadGymDetails(gymid: string) {
    this.openGymData.loadGymDetails(gymid)
    .subscribe(data => {
      this.gymData = data;
      this.loadGymImage();
    });
  }

  loadGymImage() {
    // Sätt backup-bild ifall något gym saknar bild.
    this.gymImageId = "87f931b5-5da6-4078-b706-3681a4e0d1be";
    // Kolla igenom attributen för gymmet och se ifall det finns en bild;
    // isf hämta bild-id och ersätt backup-bildens id.
    for(let a of this.gymData.Attributes) {
      if(a.Id == "Image") {
        this.gymImageId = a.Value.Id;
      }
    }
    // Förbered URL för användning.
    this.gymData.gymImage = 'http://www.stockholm.se/Web/Core/Pages/Special/StreamServiceGuideImage.aspx?path=%2fWeb%2fCore%2fPages%2fSpecial%2fServiceGuideFile.aspx%3ffileid%3d' + this.gymImageId;
  }

}
