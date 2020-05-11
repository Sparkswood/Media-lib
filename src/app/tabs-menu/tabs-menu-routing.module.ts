import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage,
    children: [
      {
        path: 'movie',
        loadChildren: () => import('../film/film.module').then( m => m.FilmPageModule)
       },
      {
        path: 'series',
        loadChildren: () => import('../serial/serial.module').then( m => m.SerialPageModule)
      },
      {
        path: 'game',
        loadChildren: () => import('../game/game.module').then( m => m.GamePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsMenuPageRoutingModule {}
