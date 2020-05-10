import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Game } from '../models/game';
import { GameFirebaseService } from '../services/game-firebase.service';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { SearchApiService } from '../services/search-api.service';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {

  itemsList: Game[] = [];

  constructor(
    private router: Router,
    private gameService: GameFirebaseService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private searchApiService: SearchApiService
  ) { }

  ionViewWillEnter() {
    this.gameService.getGames().subscribe( response => {
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
        item: 'game'
      }
    };
    this.router.navigate(['/menu/search'], navigationExtras);
  }

  seenChange(item, id) {
    item.seen = !item.seen;
    this.gameService.updateState(item, id);
  }

  favChange(item, id) {
    item.fav = !item.fav;
    this.gameService.updateState(item, id);

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
      message: 'Do you want to delete this game from library?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.gameService.deleteGame(id);
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
