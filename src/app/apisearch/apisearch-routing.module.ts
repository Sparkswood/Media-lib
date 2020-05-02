import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApisearchPage } from './apisearch.page';

const routes: Routes = [
  {
    path: '',
    component: ApisearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApisearchPageRoutingModule {}
