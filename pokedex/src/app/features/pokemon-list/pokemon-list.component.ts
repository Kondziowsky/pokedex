import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "@core/services/pokemon.service";
import {Card, CardResponse, PokemonFilters} from "@shared/models/pokemon.model";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {PokemonFiltersComponent} from "@shared/components/pokemon-filters/pokemon-filters.component";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    PokemonCardComponent,
    MatPaginator,
    RouterLink,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    PokemonFiltersComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private _pokemonService = inject(PokemonService);

  cards$!: Observable<Card[]>;
  page = 1;
  pageSize = 20;
  totalCount = 0;
  filters: PokemonFilters = {
    pokemonName: null,
    selectedType: null,
    selectedSubtype: null,
    selectedSupertype: null
  };

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
    this.cards$ = this._pokemonService.getCards(this.page, this.pageSize, this.filters).pipe(
      map((response: CardResponse) => {
        this.totalCount = response.totalCount;
        return response.data;
      })
    );
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCards();
  }

  onFilterChange(filter: PokemonFilters): void {
    this.filters = filter;
    this.page = 1;
    this.loadCards();
  }
}
