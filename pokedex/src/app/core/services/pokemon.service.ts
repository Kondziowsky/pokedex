import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Card} from "@shared/models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);

   getAllCards(): Observable<Card[]> {
      return this.http.get<Card[]>('https://api.pokemontcg.io/v2/cards');
   }
}
