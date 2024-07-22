import {inject, Injectable} from '@angular/core';
import {PokemonFilters} from "@shared/models/pokemon.model";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "@shared/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonFiltersService {
  private readonly filtersKey = 'pokemonFilters';
  private _storageService = inject(StorageService);
  private initialFilters: PokemonFilters = {
    pokemonName: null,
    selectedType: null,
    selectedSubtype: null,
    selectedSupertype: null,
    setId: null,
  };

  private filtersSubject = new BehaviorSubject<PokemonFilters>(this.initialFilters);

  // filters$ = this.filtersSubject.asObservable(); todo -> may be useful

  private getFiltersFromLocalStorage(): PokemonFilters {
    return this._storageService.getItem<PokemonFilters>(this.filtersKey) || this.initialFilters;
  }

  get filters(): PokemonFilters {
    return this.filtersSubject.value;
  }

  saveFiltersToLocalStorage() {
    this._storageService.setItem(this.filtersKey, this.filters);
  }

  updateFilters(newFilters: Partial<PokemonFilters>) {
    const updatedFilters = { ...this.filters, ...newFilters };
    this.filtersSubject.next(updatedFilters);
  }

  resetFilters(): void {
    this.filtersSubject.next(this.initialFilters);
  }

  setFiltersFromLocalStorage() {
    const filters = this.getFiltersFromLocalStorage();
    this.filtersSubject.next(filters);
  }
}
