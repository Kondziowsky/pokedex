import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CardResponse} from "@shared/models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

   getAllCards(page: number, pageSize: number): Observable<CardResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<CardResponse>(this.apiUrl, { params });
  }
}
