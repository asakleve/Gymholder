import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLeaderboardPage } from './eventLeaderboard';

@NgModule({
  declarations: [
    EventLeaderboardPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLeaderboardPage),
  ],
  exports: [
    EventLeaderboardPage
  ]
})
export class EventLeaderboardModule {}
