import { AuthService } from '../providers/auth-service';
import { CoordService } from '../providers/coord-service';
import { HashService } from '../providers/hash-service';
import { OpenGymDataService } from '../providers/open-gym-data-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { GroupsPage } from '../pages/groups/groups';
import { SettingsPage } from '../pages/settings/settings';
import { InloggPage } from '../pages/inlogg/inlogg';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesPopOverPage } from '../pages/messages-pop-over/messages-pop-over';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GymprofilePage } from '../pages/gymprofile/gymprofile';
import { EventLeaderboardPage } from '../pages/eventLeaderboard/eventLeaderboard';
import { MapPage } from '../pages/map/map';
import { MyChallengesPage } from '../pages/my-challenges/my-challenges'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    MessagesPage,
    MessagesPopOverPage,
    FriendsPage,
    GroupsPage,
    SettingsPage,
    InloggPage,
    GymprofilePage,
    EventLeaderboardPage,
    MapPage,
    MyChallengesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    MessagesPage,
    MessagesPopOverPage,
    FriendsPage,
    GroupsPage,
    SettingsPage,
    InloggPage,
    GymprofilePage,
    EventLeaderboardPage,
    MapPage,
    MyChallengesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CoordService,
    HashService,
    OpenGymDataService

  ]
})
export class AppModule {}
