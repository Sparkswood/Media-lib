import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Game } from '../models/game';
import { GameFirebaseService } from '../services/game-firebase.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {

  itemsList: Game[] = [];

  constructor(
    private router: Router,
    private gameService: GameFirebaseService
  ) { }

  ionViewWillEnter() {
    this.gameService.getGames().subscribe( response => {
      this.itemsList = this.removeNull(response);
    });
  }
  
  ionViewWillLeave() {
    this.itemsList = [];
  }

  removeNull(table: any[]) {
    let result = [];
    table.forEach( elem => {
      if (elem !== null) result.push(elem);
    });
    return result;
  }

  addNew() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: 'game'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }

}
