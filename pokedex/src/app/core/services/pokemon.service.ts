import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Card, CardResponse, CardWithPaginationResponse, PokemonTypesResponse} from "@shared/models/pokemon.model";
import {ApiUrl} from "@core/models/api-url.enum";
import {PokemonFiltersService} from "@shared/services/pokemon-filters.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _http = inject(HttpClient);
  private _pokemonFiltersService = inject(PokemonFiltersService);
  private _cacheSupertypes$!: Observable<string[]>;
  private _cacheSubtypes$!: Observable<string[]>;
  private _cacheTypes$!: Observable<string[]>;

  private _buildQuery(): string {
    const filters = this._pokemonFiltersService.filters;
    let queryParts: string[] = [];
    if (filters.selectedSubtype) queryParts.push(`subtypes:${filters.selectedSubtype}`);
    if (filters.selectedType) queryParts.push(`types:${filters.selectedType}`);
    if (filters.selectedSupertype) queryParts.push(`supertype:${filters.selectedSupertype}`);
    if (filters.pokemonName) queryParts.push(`name:${filters.pokemonName}`);
    if (filters.setId) queryParts.push(`set.id:${filters.setId}`);
    return queryParts.join(' ').trim();
  }

  private _buildParams(page: number, pageSize: number, query: string): HttpParams {
    return new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('orderBy', 'name');
  }

  getCards(page = 1, pageSize = 20): Observable<CardWithPaginationResponse> {
    const query: string = this._buildQuery();
    const params: HttpParams = this._buildParams(page, pageSize, query);
    return this._http.get<CardWithPaginationResponse>(ApiUrl.Cards, { params });
  }

  getCardDetails(id: string): Observable<Card> {
    return this._http.get<CardResponse>(`${ApiUrl.Cards}/${id}`).pipe(
      map( (res: CardResponse) => res.data)
    );
  }

  getTypes(): Observable<string[]> {
    if (!this._cacheTypes$) {
      this._cacheTypes$ = this._http.get<PokemonTypesResponse>(ApiUrl.Types).pipe(
        map((response: PokemonTypesResponse) => response.data),
        catchError((error) => {
          console.error('Error fetching supertypes:', error);
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this._cacheTypes$;
  }

  getSubtypes(): Observable<string[]> {
    if (!this._cacheSubtypes$) {
      this._cacheSubtypes$ = this._http.get<PokemonTypesResponse>(ApiUrl.Subtypes).pipe(
        map((response: PokemonTypesResponse) => response.data),
        catchError((error) => {
          console.error('Error fetching supertypes:', error);
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this._cacheSubtypes$
  }

  getSupertypes(): Observable<string[]> {
    if (!this._cacheSupertypes$) {
      this._cacheSupertypes$ = this._http.get<PokemonTypesResponse>(ApiUrl.Supertypes).pipe(
        map((response: PokemonTypesResponse) => response.data),
        catchError((error) => {
          console.error('Error fetching supertypes:', error);
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this._cacheSupertypes$;
  }

  getCardsBySetId(id: string): Observable<CardWithPaginationResponse> {
    const params = new HttpParams().set('pageSize', 10)
    return this._http.get<CardWithPaginationResponse>(`${ApiUrl.Cards}?q=set.id:${id}`, { params });
  }
}
