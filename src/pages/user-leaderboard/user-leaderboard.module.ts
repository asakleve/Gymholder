import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLeaderboardPage } from './user-leaderboard';

@NgModule({
  declarations: [
    UserLeaderboardPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLeaderboardPage),
  ],
  exports: [
    UserLeaderboardPage
  ]
})
export class UserLeaderboardModule {}
