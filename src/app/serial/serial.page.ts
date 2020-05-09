import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Series } from '../models/series';
import { SeriesFirebaseService } from '../services/series-firebase.service';

@Component({
  selector: 'app-serial',
  templateUrl: './serial.page.html',
  styleUrls: ['./serial.page.scss'],
})
export class SerialPage {

  itemsList: Series[] = [];

  constructor(
    private router: Router,
    private seriesService: SeriesFirebaseService
  ) {}

  ionViewWillEnter() {
    this.seriesService.getSeries().subscribe( response => {
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
        item: 'series'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }

}
