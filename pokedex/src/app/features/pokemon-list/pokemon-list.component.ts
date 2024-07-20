import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "@core/services/pokemon.service";
import {Card, CardResponse} from "@shared/models/pokemon.model";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    PokemonCardComponent,
    MatPaginator
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private _pokemonService = inject(PokemonService);

  cards$!: Observable<Card[]>;
  page: number = 1;
  pageSize: number = 20;
  totalCount: number = 0;

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
    const response$ = this._pokemonService.getAllCards(this.page, this.pageSize);

    this.cards$ = response$.pipe(
      map((response: CardResponse) => {
        this.totalCount = response.totalCount;
        return response.data
      })
    );
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCards();
  }
}
