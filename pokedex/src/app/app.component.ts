import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PokemonService} from "./core/services/pokemon.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.pokemonService.getAllCards().subscribe( (cards) => {
      console.log('cards: ', cards);
    })
  }
}
