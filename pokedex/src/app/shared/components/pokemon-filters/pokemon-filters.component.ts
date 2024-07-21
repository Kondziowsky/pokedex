import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {PokemonService} from "@core/services/pokemon.service";
import {AsyncPipe} from "@angular/common";
import {PokemonFilters, PokemonTypesResponse} from "@shared/models/pokemon.model";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-pokemon-filters',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel,
    FormsModule,
    MatInput,
    AsyncPipe
  ],
  templateUrl: './pokemon-filters.component.html',
  styleUrl: './pokemon-filters.component.scss'
})
export class PokemonFiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<PokemonFilters>();

  private _pokemonService = inject(PokemonService);

  types$!: Observable<string[]>;
  subtypes$!: Observable<string[]>;
  supertypes$!: Observable<string[]>;

  filters: PokemonFilters = {
    pokemonName: null,
    selectedType: null,
    selectedSubtype: null,
    selectedSupertype: null
  };

  ngOnInit(): void {
    this.loadSelects();
  }

  private loadSelects(): void {
    this.types$ = this._pokemonService.getAllTypes().pipe(
      map((response: PokemonTypesResponse) => response.data),
      catchError((error) => {
        console.error('Error fetching supertypes:', error);
        return of([]);
      })
    );
    this.subtypes$ = this._pokemonService.getAllSubtypes().pipe(
      map((response: PokemonTypesResponse) => response.data),
      catchError((error) => {
        console.error('Error fetching supertypes:', error);
        return of([]);
      })
    );
    this.supertypes$ = this._pokemonService.getAllSupertypes().pipe(
      map((response: PokemonTypesResponse) => response.data),
      catchError((error) => {
        console.error('Error fetching supertypes:', error);
        return of([]);
      })
    );
  }

  applyFilter(): void {
    this.filterChange.emit(this.filters);
  }

  clearFilters(): void {
    this.filters = {
      pokemonName: null,
      selectedType: null,
      selectedSubtype: null,
      selectedSupertype: null
    };
  }
}
