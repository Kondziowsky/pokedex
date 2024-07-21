import {Component, inject, OnInit} from '@angular/core';
import {Card} from "@shared/models/pokemon.model";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "@core/services/pokemon.service";
import {MatCardImage} from "@angular/material/card";
import {AsyncPipe, JsonPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatCardImage,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    JsonPipe
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _pokemonService = inject(PokemonService);
  card$!: Observable<Card>;

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.card$ = this._pokemonService.getCardDetails(id);
    }
  }
}
