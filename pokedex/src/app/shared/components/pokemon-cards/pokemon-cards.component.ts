import {Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import {RouterLink} from "@angular/router";

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
  styleUrl: './pokemon-cards.component.scss'
})
export class PokemonCardsComponent {
  @Input() cards: any = null;

}
