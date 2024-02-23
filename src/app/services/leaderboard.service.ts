import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  scores: any[] = JSON.parse(localStorage.getItem("scores") || "[]");
  constructor() {

   }

  addScore(score: any){
    this.scores.push(score);
    this.scores.sort((a,b)=> (a["score"] < b["score"] ? 1:-1));
    localStorage.setItem("scores", JSON.stringify(this.scores));
  }

  getScores(){
    return this.scores;
  }
}
