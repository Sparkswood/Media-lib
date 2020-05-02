import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  private mainUrl = environment.mainUrl;
  private apiKey = environment.apiKey;
  private itemType;

  constructor(private http: HttpClient) { }

  getItemsList(itemTitle: string): Observable<any> {
    return this.http.get(`${this.mainUrl}type=${this.itemType}&apikey=${this.apiKey}&s=${itemTitle}`);
  }

  setItemType(itemType: string) {
    this.itemType = itemType;
  }

}
