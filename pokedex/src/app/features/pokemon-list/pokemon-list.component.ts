import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "@core/services/pokemon.service";
import {Card, CardResponse} from "@shared/models/pokemon.model";
import {map, Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    JsonPipe
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  cards$!: Observable<Card[]>;
  page: number = 1;
  pageSize: number = 20;
  totalCount: number = 0;

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
      const response$ = this.pokemonService.getAllCards(this.page, this.pageSize);

    response$.subscribe((response: CardResponse) => {
      this.totalCount = response.totalCount;
    });

    this.cards$ = response$.pipe(
      map((response: CardResponse) => response.data)
    );
  }
}
