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
      title: 'Movies',
      url: '/menu/movie',
      icon: 'videocam-outline'
    },
    {
      title: 'Series',
      url: '/menu/series',
      icon: 'albums-outline'
    },
    {
      title: 'Games',
      url: '/menu/game',
      icon: 'game-controller-outline'
    },
    {
      title: 'Manage library',
      url: '/menu/search',
      icon: 'library-outline'
    },
  ]

  selectedPath = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe( (event: RouterEvent) => {
      if (event.url) {
        this.selectedPath = event.url.split('?')[0];
      }
    });
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['login']);
  }

}
