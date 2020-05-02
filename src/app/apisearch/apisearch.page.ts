import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SearchApiService } from '../services/search-api.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-apisearch',
  templateUrl: './apisearch.page.html',
  styleUrls: ['./apisearch.page.scss'],
})
export class ApisearchPage {

  itemTitle = '';
  itemsList = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private searchapiService: SearchApiService
  ) { }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  searchItems() {
    if (this.itemTitle.length > 0) {
      this.searchapiService.getItemsList(this.itemTitle).subscribe( response => {
        if (response.Error) {
          response.Error === 'Movie not found!'? this.presentToast('Item not found.', 1000) : this.presentToast(response.Error, 1000);
        } else {
          this.itemsList = response.Search;
        }
      });
    } else {
      this.presentToast('Title can\'t be empty.', 1000);
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
