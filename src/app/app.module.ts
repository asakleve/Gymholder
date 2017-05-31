import { AuthService } from '../providers/auth-service';
import { CoordService } from '../providers/coord-service';
import { HashService } from '../providers/hash-service';
import { OpenGymDataService } from '../providers/open-gym-data-service';
import { BackendService } from '../providers/backend-service';
import { ObjectManager } from '../providers/object-manager';

//import { Youtube } from '../pipes/youtube';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { VideoPlayer} from '@ionic-native/video-player';


//import { Camera } from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { GroupsPage } from '../pages/groups/groups';
import { SettingsPage } from '../pages/settings/settings';
import { InloggPage } from '../pages/inlogg/inlogg';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesPopOverPage } from '../pages/messages-pop-over/messages-pop-over';


import { GymprofilePage } from '../pages/gymprofile/gymprofile';
import { EventLeaderboardPage } from '../pages/eventLeaderboard/eventLeaderboard';
import { MapPage } from '../pages/map/map';
import { AddresultPage } from '../pages/addresult/addresult';
import { MyChallengesPage } from '../pages/my-challenges/my-challenges';
import { GymLeaderboardPage } from '../pages/gym-leaderboard/gym-leaderboard';
import { UserLeaderboardPage } from '../pages/user-leaderboard/user-leaderboard';
import { BadassPage } from '../pages/badass/badass';
import { SendChallengePage } from '../pages/send-challenge/send-challenge';





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
    MyChallengesPage,
    GymLeaderboardPage,
    UserLeaderboardPage,
    AddresultPage,
    BadassPage,
    //  Youtube,
    SendChallengePage
    //VideoPlayer


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
    MyChallengesPage,
    GymLeaderboardPage,
    UserLeaderboardPage,
    AddresultPage,
    BadassPage,
    SendChallengePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CoordService,
    HashService,
    OpenGymDataService,
    BackendService,
    Geolocation,
    ObjectManager,
    Facebook,
    MediaCapture,
    Camera,
    VideoPlayer,
    NativeStorage


  ]
})
export class AppModule {}
