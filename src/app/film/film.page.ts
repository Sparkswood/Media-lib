import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MovieFirebaseService } from '../services/movie-firebase.service';
import { Movie } from '../models/movie';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { SearchPage } from '../search/search.page';
import { SearchApiService } from '../services/search-api.service';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage {

  itemsList: Movie[] = [];

  constructor(
    private router: Router,
    private movieService: MovieFirebaseService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private searchApiService: SearchApiService
  ) { }

  ionViewWillEnter() {
    this.movieService.getMovies().subscribe( response => {
      this.itemsList = this.removeNull(response);
    });
  }
  
  ionViewWillLeave() {
    this.itemsList = [];
  }

  removeNull(table: any[]) {
    let result = [];
    table.forEach( elem => {
      if (elem !== null) result.push(elem);
    });
    return result;
  }

  addNew() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: 'movie'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }

  openDetailsModal(item) {
    this.modalController.create({component: DetailsPage}).then( modalElement => {
      this.searchApiService.setActionType(false, item);
      modalElement.present();
      modalElement.onDidDismiss().then( () => {
        this.searchApiService.setActionType(false);
      })
    });
  }

  seenChange(item, id) {
    item.seen = !item.seen;
    this.movieService.updateState(item, id);
  }

  favChange(item, id) {
    item.fav = !item.fav;
    this.movieService.updateState(item, id);

  }

  editItem(item) {
    this.modalController.create({component: SearchPage}).then( modalElement => {
      this.searchApiService.setActionType(true, item);
      modalElement.present();
      modalElement.onDidDismiss().then( () => {
        this.searchApiService.setActionType(false);
      })
    });
  }

  deleteItem(id) {
    this.deleteAlert(id);
  }

  async deleteAlert(id) {
    const alert = await this.alertController.create({
      message: 'Do you want to delete this movie from library?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.movieService.deleteMovie(id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.presentToast('Action canceled.', 1000);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
