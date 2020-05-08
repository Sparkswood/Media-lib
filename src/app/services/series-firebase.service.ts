import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Series } from '../models/series';
 
@Injectable({
  providedIn: 'root'
})
export class SeriesFirebaseService {
  private series: Observable<Series[]>;
  private serieCollection: AngularFirestoreCollection<Series>;
 
  constructor(private afs: AngularFirestore) {
    this.serieCollection = this.afs.collection<Series>('series');
    this.series = this.serieCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getSeries(): Observable<Series[]> {
    return this.series;
  }
 
  getSerie(id: string): Observable<Series> {
    return this.serieCollection.doc<Series>(id).valueChanges().pipe(
      take(1),
      map(serie => {
        serie.id = id;
        return serie
      })
    );
  }
 
  addSerie(serie: Series): Promise<DocumentReference> {
    return this.serieCollection.add(serie);
  }
 
  // updateSerie(serie: Series): Promise<void> {
  //   return this.serieCollection.doc(serie.imdbID).update({ name: serie.name, notes: serie.notes });
  // }
 
  deleteSerie(id: string): Promise<void> {
    return this.serieCollection.doc(id).delete();
  }
}