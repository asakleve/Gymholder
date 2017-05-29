import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { AuthService } from '../providers/auth-service';
import { BackendService } from '../providers/backend-service';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { GroupsPage } from '../pages/groups/groups';
import { SettingsPage } from '../pages/settings/settings';
import { InloggPage } from '../pages/inlogg/inlogg';
import { RegisterPage } from '../pages/register/register';
import { MessagesPage } from '../pages/messages/messages';

import { GymprofilePage } from '../pages/gymprofile/gymprofile';
import { EventLeaderboardPage } from '../pages/eventLeaderboard/eventLeaderboard';
import { MapPage } from '../pages/map/map';
import { MyChallengesPage } from '../pages/my-challenges/my-challenges';
import { GymLeaderboardPage } from '../pages/gym-leaderboard/gym-leaderboard';
import { UserLeaderboardPage } from '../pages/user-leaderboard/user-leaderboard';
import { BadassPage } from '../pages/badass/badass';
import { SendChallengePage } from '../pages/send-challenge/send-challenge';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InloggPage;
  public authService;

  pages: Array<{title: string, component: any}>;

  constructor(authService: AuthService, public backendService: BackendService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.authService = authService;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Messages', component: MessagesPage },
      { title: 'Friends', component: FriendsPage },
      { title: 'Groups', component: GroupsPage },
      { title: 'Settings', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.backendService.loadAllGyms();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
