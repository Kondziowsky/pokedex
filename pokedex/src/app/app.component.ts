import {AfterContentChecked, ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "@core/components/header/header.component";
import {FooterComponent} from "@core/components/footer/footer.component";
import {MatToolbar} from "@angular/material/toolbar";
import {LoadingService} from "@core/services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatToolbar, AsyncPipe, MatProgressSpinner, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterContentChecked{
  private _loadingService = inject(LoadingService)
  private _cdr = inject(ChangeDetectorRef);
  loading$ = this._loadingService.loading$;

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
  }
}
