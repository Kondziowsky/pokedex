import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingQueue = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingQueue++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingQueue--;
    if (this.loadingQueue <= 0) {
      this.loadingQueue = 0;
      this.loadingSubject.next(false);
    }
  }
}
