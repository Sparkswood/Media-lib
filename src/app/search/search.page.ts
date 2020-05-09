import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApisearchPage } from '../apisearch/apisearch.page';
import { SearchApiService } from '../services/search-api.service';
import { MovieFirebaseService } from '../services/movie-firebase.service';
import { SeriesFirebaseService } from '../services/series-firebase.service';
import { GameFirebaseService } from '../services/game-firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { Series } from '../models/series';
import { Game } from '../models/game';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  itemType;
  selectedItem;

  totalSeasons = 1;

  genres = [
    {
      name: 'Action',
      isChecked: false
    },
    {
      name: 'Adventure',
      isChecked: false
    },
    {
      name: 'Animation',
      isChecked: false
    },
    {
      name: 'Biography',
      isChecked: false
    },
    {
      name: 'Crime',
      isChecked: false
    },
    {
      name: 'Comedy',
      isChecked: false
    },
    {
      name: 'Drama',
      isChecked: false
    },
    {
      name: 'Documentary',
      isChecked: false
    },
    {
      name: 'Family',
      isChecked: false
    },
    {
      name: 'Fantasy',
      isChecked: false
    },
    {
      name: 'History',
      isChecked: false
    },
    {
      name: 'Horror',
      isChecked: false
    },
    {
      name: 'Music',
      isChecked: false
    },
    {
      name: 'Musical',
      isChecked: false
    },
    {
      name: 'Mystery',
      isChecked: false
    },
    {
      name: 'Romance',
      isChecked: false
    },
    {
      name: 'Sci-Fi',
      isChecked: false
    },
    {
      name: 'Short',
      isChecked: false
    },
    {
      name: 'Thriller',
      isChecked: false
    },
    {
      name: 'War',
      isChecked: false
    },
    {
      name: 'Western',
      isChecked: false
    }
  ]

  addForm: FormGroup;

  errorMessages = {
    title: [
      { type: 'required', message: 'Title is required' },
    ],
    year: [
      { type: 'required', message: 'Year is required' },
    ]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private searchApiService: SearchApiService,
    private movieFirebaseService: MovieFirebaseService,
    private seriesFirebaseService: SeriesFirebaseService,
    private gameFirebaseService: GameFirebaseService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authenticationService: AuthenticationService
  ) { 
    this.activatedRoute.queryParams.subscribe( params => {
      if (params.item) {
        this.itemType = params.item;

      } else {
        this.itemType = 'movie';
      }
    });
    this.initializeForm();
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.clearForm();
  }

  clearForm() {
    this.genres.forEach( genre => {
      genre.isChecked = false;
    });
    this.totalSeasons = 1;
    this.addForm.clearValidators()
    this.addForm.reset()
    this.initializeForm();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  initializeForm() {
    this.addForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      poster: new FormControl('', Validators.compose([])),
      year: new FormControl('', Validators.compose([
        Validators.required
      ])),
      toyear: new FormControl('', Validators.compose([])),
      director: new FormControl('', Validators.compose([])),
      plot: new FormControl('', Validators.compose([])),
      rating: new FormControl('', Validators.compose([])),
      runtime: new FormControl('', Validators.compose([])),
    });
  }

  segmentChanged(event) {
    this.itemType = event.detail.value;
    this.clearForm();
  }

  setTotalSeasons(string) {
    if (string === '+') {
      if (this.totalSeasons < 100) {
        this.totalSeasons ++;
      }
    } else {
      if (this.totalSeasons > 1) {
        this.totalSeasons --;
      }
    }
  }

  searchItem() {
    this.modalController.create({component: ApisearchPage}).then( modalElement => {
      this.searchApiService.setItemType(this.itemType);
      modalElement.present();
      modalElement.onDidDismiss().then( response => {
        if (response.data !== undefined) {
          this.selectedItem = response.data;
          this.fillForm();
        }
      })
    });
  }

  fillForm() {
    this.addForm.get('title').setValue(this.selectedItem.Title === 'N/A'? 'Unknown' : this.selectedItem.Title);
    this.addForm.get('poster').setValue(this.selectedItem.Poster === 'N/A'? 'Unknown' : this.selectedItem.Poster);
    this.addForm.get('plot').setValue(this.selectedItem.Plot === 'N/A'? 'Unknown' : this.selectedItem.Plot);
    const rating = this.selectedItem.Ratings[0].Value.split('/')[0].split('.');
    const score = rating[0] + rating[1]; 
    this.addForm.get('rating').setValue(score);

    const specGenres = this.selectedItem.Genre.split(', ');
    this.genres.forEach( genre => {
      specGenres.forEach( specGenre => {
        if (specGenre === genre.name) {
          genre.isChecked = true;
        }
      });
    });

    let runtime;
    switch (this.itemType) {
      case 'movie':
        runtime = this.selectedItem.Runtime.split(' ')[0];
        this.addForm.get('runtime').setValue(runtime);
        this.addForm.get('director').setValue(this.selectedItem.Director === 'N/A'? 'Unknown' : this.selectedItem.Director);
        this.addForm.get('year').setValue(this.selectedItem.Year);
        break;
      case 'series':
        runtime = this.selectedItem.Runtime.split(' ')[0];
        this.addForm.get('runtime').setValue(runtime);
        this.totalSeasons = this.selectedItem.totalSeasons;
        this.addForm.get('year').setValue(this.selectedItem.Year.substring(0, 4));
        if (this.selectedItem.Year.length > 5) {
          this.addForm.get('toyear').setValue(this.selectedItem.Year.substring(5, 9));
        }
        break;
      case 'game':
        this.addForm.get('director').setValue(this.selectedItem.Director === 'N/A'? 'Unknown' : this.selectedItem.Director);
        this.addForm.get('year').setValue(this.selectedItem.Year);
        break;
    }
  }

  createNewToAdd() {
    let genres = '';
    this.genres.forEach( genre => {
      if (genre.isChecked) {
        genres.concat(`${genre.name}, `);
      }
    });
    switch (this.itemType) {
      case 'movie':
        let movie: Movie = {
          id: '',
          UserUID: this.authenticationService.userUID(),
          Title: this.addForm.get('title').value,
          Plot: this.addForm.get('plot').value,
          Poster: this.addForm.get('poster').value,
          Ratings: [
            {
              Source: '',
              Value: this.addForm.get('rating').value ? this.addForm.get('rating').value : ''
            }
          ],
          Genre: genres,
          Runtime: this.addForm.get('runtime').value ? this.addForm.get('runtime').value : '',
          Director: this.addForm.get('director').value,
          Year: this.addForm.get('year').value.substring(0, 4),
          Type: 'movie'
        }
        this.selectedItem = movie;
        break;
      case 'series':
        let series: Series = {
          id: '',
          UserUID: this.authenticationService.userUID(),
          Title: this.addForm.get('title').value,
          Plot: this.addForm.get('plot').value,
          Poster: this.addForm.get('poster').value,
          Ratings: [
            {
              Source: '',
              Value: this.addForm.get('rating').value ? this.addForm.get('rating').value : ''
            }
          ],
          Genre: genres,
          Runtime: this.addForm.get('runtime').value ? this.addForm.get('runtime').value : '',
          totalSeasons: this.totalSeasons.toString(),
          Year: `${this.addForm.get('year').value.substring(0, 4)}-${this.addForm.get('toyear').value.substring(0, 4)}`,
          Type: 'series'
        }
        this.selectedItem = series;
        break;
      case 'game':
        let game: Game = {
          id: '',
          UserUID: this.authenticationService.userUID(),
          Title: this.addForm.get('title').value,
          Plot: this.addForm.get('plot').value,
          Poster: this.addForm.get('poster').value,
          Director: this.addForm.get('director').value,
          Ratings: [
            {
              Source: '',
              Value: this.addForm.get('rating').value ? this.addForm.get('rating').value : ''
            }
          ],
          Genre: genres,
          Year: this.addForm.get('year').value.substring(0, 4),
          Type: 'game'
        }
        this.selectedItem = game;
        break;
    }
  }

  addToFirebase() {
    this.createNewToAdd();
    switch (this.itemType) {
      case 'movie':
        this.movieFirebaseService.addMovie(this.selectedItem).then( response => {
          this.presentToast('Movie added to your collection', 1000);
        });
        break;
      case 'series':
        this.seriesFirebaseService.addSerie(this.selectedItem).then( response => {
          this.presentToast('Series added to your collection', 1000);
        });;
        
        break;
      case 'game':
        this.gameFirebaseService.addGame(this.selectedItem).then( response => {
          this.presentToast('Game added to your collection', 1000);
        });;
        break;
    }
    this.clearForm();
  }

}
