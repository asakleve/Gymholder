import { AuthService } from '../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { GroupsPage } from '../pages/groups/groups';
import { SettingsPage } from '../pages/settings/settings';
import { InloggPage } from '../pages/inlogg/inlogg';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GymprofilePage } from '../pages/gymprofile/gymprofile';
import { EventLeaderboardPage } from '../pages/eventLeaderboard/eventLeaderboard';
import { MapPage } from '../pages/map/map';
import { MyChallengesPage } from '../pages/my-challenges/my-challenges';

import { Results } from '../pages/results/results';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    FriendsPage,
    GroupsPage,
    SettingsPage,
    InloggPage,
    GymprofilePage,
    EventLeaderboardPage,
    MapPage,
    MyChallengesPage,
    Results
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    FriendsPage,
    GroupsPage,
    SettingsPage,
    InloggPage,
    GymprofilePage,
    EventLeaderboardPage,
    MapPage,
    MyChallengesPage,
    Results
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
