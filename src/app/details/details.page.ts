import { Component } from '@angular/core';
import { SearchApiService } from '../services/search-api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  
  item;
  itemType;

  genres = [];

  constructor(
    private searchApiService: SearchApiService,
    private modalController: ModalController
  ) {
    let temp = this.searchApiService.getActionType();
    if (temp[1] !== null) {
      this.item = temp[1];
      this.itemType = this.item.Type;
      this.genres = this.item.Genre.split(', ');
      this.genres = this.genres.filter( genre => genre != '');
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
