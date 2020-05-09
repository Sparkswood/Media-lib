import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AuthenticationService } from '../shared/authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class MovieFirebaseService {
  private movies: Observable<Movie[]>;
  private movieCollection: AngularFirestoreCollection<Movie>;
 
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.movieCollection = this.afs.collection<Movie>('movie');
    this.movies = this.movieCollection.snapshotChanges().pipe(
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
 
  getMovies(): Observable<Movie[]> {
    return this.movies;
  }
 
  getMovie(id: string): Observable<Movie> {
    return this.movieCollection.doc<Movie>(id).valueChanges().pipe(
      take(1),
      map(movie => {
        movie.id = id;
        return movie
      })
    );
  }
 
  addMovie(movie: Movie): Promise<DocumentReference> {
    return this.movieCollection.add(movie);
  }
 
  // updateMovie(movie: Movie): Promise<void> {
  //   return this.movieCollection.doc(movie.imdbID).update({ name: movie.name, notes: movie.notes });
  // }
 
  deleteMovie(id: string): Promise<void> {
    return this.movieCollection.doc(id).delete();
  }
}