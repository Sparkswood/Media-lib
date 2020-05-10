import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { AuthenticationService } from '../shared/authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class GameFirebaseService {
  private games: Observable<Game[]>;
  private gameCollection: AngularFirestoreCollection<Game>;
 
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.gameCollection = this.afs.collection<Game>('game');
    this.games = this.gameCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          let thisID = data.UserUID.toString();
          let currentUserID = this.auth.getUserUID.toString();
          return thisID === currentUserID ? { id, ...data } : null;
        });
      })
    );
  }
 
  getGames(): Observable<Game[]> {
    return this.games;
  }
 
  addGame(game: Game): Promise<DocumentReference> {
    return this.gameCollection.add(game);
  }
 
  updateState(game: Game, id): Promise<void> {
    return this.gameCollection.doc(id).update({ fav: game.fav, seen: game.seen });
  }
 
  updateGame(game: Game, id): Promise<void> {
    return this.gameCollection.doc(id).update(game);
  }
 
  deleteGame(id: string): Promise<void> {
    return this.gameCollection.doc(id).delete();
  }
}
