import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addNew() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: 'movie'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }
}
