import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-serial',
  templateUrl: './serial.page.html',
  styleUrls: ['./serial.page.scss'],
})
export class SerialPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
