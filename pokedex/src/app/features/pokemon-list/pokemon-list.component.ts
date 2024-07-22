import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "@core/services/pokemon.service";
import {Card, CardWithPaginationResponse, PokemonFilters} from "@shared/models/pokemon.model";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {PokemonFiltersComponent} from "@shared/components/pokemon-filters/pokemon-filters.component";
import {PokemonFiltersService} from "@shared/services/pokemon-filters.service";
import {PokemonCardsComponent} from "@shared/components/pokemon-cards/pokemon-cards.component";

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
    PokemonFiltersComponent,
    PokemonCardsComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private _pokemonApiService = inject(PokemonService);
  private _pokemonFiltersService = inject(PokemonFiltersService);

  cards$!: Observable<Card[]>;
  page = 1;
  pageSize = 20;
  totalCount = 0;

  ngOnInit(): void {
    this._pokemonFiltersService.setFiltersFromLocalStorage();
    this.loadCards();
  }

  private loadCards(): void {
  this._pokemonFiltersService.saveFiltersToLocalStorage();
    this.cards$ = this._pokemonApiService.getCards(this.page, this.pageSize).pipe(
      map((response: CardWithPaginationResponse) => {
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
    this._pokemonFiltersService.updateFilters(filter);
    this.page = 1;
    this.loadCards();
  }
}
