import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {PokemonService} from "@core/services/pokemon.service";
import {AsyncPipe} from "@angular/common";
import {PokemonFilters} from "@shared/models/pokemon.model";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {Observable} from "rxjs";
import {EnterTriggerDirective} from "@shared/directives/enter-trigger.directive";
import {PokemonFiltersService} from "@shared/services/pokemon-filters.service";

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
    AsyncPipe,
    EnterTriggerDirective
  ],
  templateUrl: './pokemon-filters.component.html',
  styleUrl: './pokemon-filters.component.scss'
})
export class PokemonFiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<PokemonFilters>();

  private _pokemonService = inject(PokemonService);
  private _pokemonFiltersService = inject(PokemonFiltersService);

  types$!: Observable<string[]>;
  subtypes$!: Observable<string[]>;
  supertypes$!: Observable<string[]>;

  filters = this._pokemonFiltersService.filters;

  ngOnInit(): void {
    this.loadSelects();
  }

  private loadSelects(): void {
    this.types$ = this._pokemonService.getTypes();
    this.subtypes$ = this._pokemonService.getSubtypes();
    this.supertypes$ = this._pokemonService.getSupertypes();
  }

  applyFilter(): void {
    this.filterChange.emit(this.filters);
  }

  clearFilters(): void {
    this._pokemonFiltersService.resetFilters();
  }
}
