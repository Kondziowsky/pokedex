import {Component, inject, OnInit} from '@angular/core';
import {MarketService} from "@core/services/market.service";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {PokemonCardsComponent} from "@shared/components/pokemon-cards/pokemon-cards.component";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    PokemonCardsComponent,
    JsonPipe
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit{
  marketService = inject(MarketService);
  btcUsdt!: Observable<any>;

  ngOnInit() {
    this.btcUsdt = this.marketService.getBtcUsd();
  }
}
