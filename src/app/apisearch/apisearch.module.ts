import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApisearchPageRoutingModule } from './apisearch-routing.module';

import { ApisearchPage } from './apisearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApisearchPageRoutingModule
  ],
  declarations: [ApisearchPage]
})
export class ApisearchPageModule {}
