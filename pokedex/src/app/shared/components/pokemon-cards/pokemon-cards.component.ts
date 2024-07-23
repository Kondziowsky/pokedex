import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import {RouterLink} from "@angular/router";
import {Card} from "@shared/models/pokemon.model";

@Component({
  selector: 'app-pokemon-cards',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PokemonCardComponent,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './pokemon-cards.component.html',
  styleUrl: './pokemon-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardsComponent {
  @Input() cards: Card[] = [];

  trackByFn(index: number, item: Card) {
    return index;
  }
}
