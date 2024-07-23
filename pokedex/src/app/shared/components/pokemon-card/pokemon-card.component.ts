import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Card} from "@shared/models/pokemon.model";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {
  @Input() card!: Card;
}
