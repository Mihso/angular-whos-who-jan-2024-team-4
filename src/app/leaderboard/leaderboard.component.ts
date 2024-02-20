import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores = this.leaderboardService.getScores();
  @Output() sender = new EventEmitter<any>;
  constructor(  private leaderboardService: LeaderboardService) {

   }

  ngOnInit(): void {
    this.leaderboardService.addScore({});
    console.log(this.scores);
    this.sender.emit(this.scores);
  }

  onPress(){
    console.log("done");
    this.leaderboardService.addScore({});
  }



}
