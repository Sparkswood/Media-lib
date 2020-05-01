import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  goToSearchPage() {
    this.router.navigate(['/menu/search']);
  }

}
