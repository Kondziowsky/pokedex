import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, repeat} from "rxjs";
import {ApiUrl} from "@core/models/api-url.enum";
import {Card} from "@shared/models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private _http = inject(HttpClient);

  getBtcUsd(): Observable<any> {
    return this._http.get<any>(`${ApiUrl.GetBtcUsdt}`).pipe(
      repeat({ delay: 10000 })
    );
  }
}
