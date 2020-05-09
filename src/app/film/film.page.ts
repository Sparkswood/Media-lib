import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MovieFirebaseService } from '../services/movie-firebase.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage {

  itemsList: Movie[] = [];

  constructor(
    private router: Router,
    private movieService: MovieFirebaseService
  ) { }

  ionViewWillEnter() {
    this.movieService.getMovies().subscribe( response => {
      this.itemsList = this.removeNull(response);
      console.log(this.itemsList[0]);
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
        item: 'movie'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }
}
