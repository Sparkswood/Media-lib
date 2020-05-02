import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApisearchPage } from '../apisearch/apisearch.page';
import { SearchApiService } from '../services/search-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  itemType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private searchApiService: SearchApiService
  ) { 
    this.activatedRoute.queryParams.subscribe( params => {
      if (params.item) {
        this.itemType = params.item;

      } else {
        this.itemType = 'movie';
      }
    });
  }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.itemType = event.detail.value;
  }

  searchItem() {
    this.modalController.create({component: ApisearchPage}).then( modalElement => {
      this.searchApiService.setItemType(this.itemType);
      modalElement.present();
    });
  }

}
