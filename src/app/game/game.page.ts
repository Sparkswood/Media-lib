import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
