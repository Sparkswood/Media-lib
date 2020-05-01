import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage,
    children: [
      {
        path: 'film',
        loadChildren: '../film/film.module#FilmPageModule'
       },
      {
        path: 'serial',
        loadChildren: '../serial/serial.module#SerialPageModule'
      },
      {
        path: 'game',
        loadChildren: '../game/game.module#GamePageModule'
      },
      {
        path: 'search',
        loadChildren: '../search/search.module#SearchPageModule'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsMenuPageRoutingModule {}
