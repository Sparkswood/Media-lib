import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Series } from '../models/series';
import { AuthenticationService } from '../shared/authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class SeriesFirebaseService {
  private series: Observable<Series[]>;
  private serieCollection: AngularFirestoreCollection<Series>;
 
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.serieCollection = this.afs.collection<Series>('series');
    this.series = this.serieCollection.snapshotChanges().pipe(
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
 
  getSeries(): Observable<Series[]> {
    return this.series;
  }
 
  addSerie(serie: Series): Promise<DocumentReference> {
    return this.serieCollection.add(serie);
  }
 
  updateState(series: Series, id): Promise<void> {
    return this.serieCollection.doc(id).update({ fav: series.fav, seen: series.seen });
  }
 
  updateSerie(series: Series, id): Promise<void> {
    return this.serieCollection.doc(id).update(series);
  }
 
  deleteSerie(id: string): Promise<void> {
    return this.serieCollection.doc(id).delete();
  }
}