import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GymLeaderboardPage } from './gym-leaderboard';

@NgModule({
  declarations: [
    GymLeaderboardPage,
  ],
  imports: [
    IonicPageModule.forChild(GymLeaderboardPage),
  ],
  exports: [
    GymLeaderboardPage
  ]
})
export class GymLeaderboardModule {}
