import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this._loadingSubject.asObservable();

  show() {
    this._loadingSubject.next(true);
  }

  hide() {
    this._loadingSubject.next(false);
  }
}
