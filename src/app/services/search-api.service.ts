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
  private actionType = false;
  private itemToEdit = null;

  constructor(private http: HttpClient) { }

  getItemsList(itemTitle: string): Observable<any> {
    return this.http.get(`${this.mainUrl}type=${this.itemType}&apikey=${this.apiKey}&s=${itemTitle}`);
  }

  getItemDetails(itemId: string) {
    return this.http.get(`${this.mainUrl}type=${this.itemType}&apikey=${this.apiKey}&i=${itemId}`);
  }

  setItemType(itemType: string) {
    this.itemType = itemType;
  }

  getItemType() {
    return this.itemType;
  }

  setActionType(actionType, item?) {
    item ? this.itemToEdit = item : this.itemToEdit = null;
    this.actionType = actionType;
  }

  getActionType() {
    return [this.actionType, this.itemToEdit];
  }

}
