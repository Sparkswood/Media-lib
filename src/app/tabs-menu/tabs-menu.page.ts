import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.page.html',
  styleUrls: ['./tabs-menu.page.scss'],
})
export class TabsMenuPage implements OnInit {

  pages = [
    {
      title: 'Films',
      url: '/menu/film',
      icon: 'videocam-outline'
    },
    {
      title: 'Series',
      url: '/menu/serial',
      icon: 'albums-outline'
    },
    {
      title: 'Games',
      url: '/menu/game',
      icon: 'game-controller-outline'
    },
    {
      title: 'Search',
      url: '/menu/search',
      icon: 'search-outline'
    },
  ]

  selectedPath = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['login']);
  }

}
