import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApisearchPage } from '../apisearch/apisearch.page';
import { SearchApiService } from '../services/search-api.service';
import * as firebase from 'firebase';
import { MovieFirebaseService } from '../services/movie-firebase.service';
import { SeriesFirebaseService } from '../services/series-firebase.service';
import { GameFirebaseService } from '../services/game-firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  itemType;
  selectedItem;

  genres = [
    {
      name: 'Action',
      isChecked: true
    },{
      name: 'Horror',
      isChecked: false
    },{
      name: 'Mystery',
      isChecked: false
    },{
      name: 'Thriller',
      isChecked: false
    },{
      name: 'Crime',
      isChecked: false
    },{
      name: 'Drama',
      isChecked: false
    },{
      name: 'Fantasy',
      isChecked: false
    },{
      name: 'Animation',
      isChecked: false
    },{
      name: 'Adventure',
      isChecked: false
    },{
      name: 'Family',
      isChecked: false
    },{
      name: 'Fantasy',
      isChecked: false
    },{
      name: 'Comedy',
      isChecked: false
    },{
      name: 'Romance',
      isChecked: false
    },{
      name: 'Music',
      isChecked: false
    },{
      name: 'Musical',
      isChecked: false
    },{
      name: 'Sci-Fi',
      isChecked: false
    },{
      name: 'Biography',
      isChecked: false
    },{
      name: 'Short',
      isChecked: false
    },{
      name: 'Documentary',
      isChecked: false
    },{
      name: 'History',
      isChecked: false
    },{
      name: 'War',
      isChecked: false
    },{
      name: 'Western',
      isChecked: false
    }
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private searchApiService: SearchApiService,
    private movieFirebaseService: MovieFirebaseService,
    private seriesFirebaseService: SeriesFirebaseService,
    private gameFirebaseService: GameFirebaseService
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
      modalElement.onDidDismiss().then( response => {
        if (response) {
          this.selectedItem = response.data;
          console.log(response.data);
        }
      })
    });
  }

  addToFirebase() {
    switch (this.itemType) {
      case 'movie':
        this.movieFirebaseService.addMovie(this.selectedItem);
        break;
      case 'series':
        this.seriesFirebaseService.addSerie(this.selectedItem);
        break;
      case 'game':
        this.gameFirebaseService.addGame(this.selectedItem);
        break;
    }
  }

}
