import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Card, CardResponse, PokemonFilters, PokemonTypesResponse} from "@shared/models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _http = inject(HttpClient);
  private _baseUrl = 'https://api.pokemontcg.io/v2';

  private _getEndpointUrl(endpoint: string): string {
    return `${this._baseUrl}/${endpoint}`;
  }

  getCards(page: number, pageSize: number, filters: PokemonFilters): Observable<CardResponse> {
    let query = '';
    if (filters.selectedSubtype) query += ` subtypes:${filters.selectedSubtype}`;
    if (filters.selectedType) query += ` types:${filters.selectedType}`;
    if (filters.selectedSupertype) query += ` supertypes:${filters.selectedSupertype}`;
    if (filters.pokemonName) query += ` name:${filters.pokemonName}`;

    const params = new HttpParams()
      .set('q', query.trim())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('orderBy', 'name');
    return this._http.get<CardResponse>(this._getEndpointUrl('cards'), { params });
  }

  getCardDetails(id: string): Observable<Card> {
    return this._http.get<Card>(this._getEndpointUrl(`cards/${id}`));
  }

  getAllTypes(): Observable<PokemonTypesResponse> {
    return this._http.get<PokemonTypesResponse>(this._getEndpointUrl('types'));
  }

  getAllSubtypes(): Observable<PokemonTypesResponse> {
    return this._http.get<PokemonTypesResponse>(this._getEndpointUrl('subtypes'));
  }

  getAllSupertypes(): Observable<PokemonTypesResponse> {
    return this._http.get<PokemonTypesResponse>(this._getEndpointUrl('supertypes'));
  }
}
