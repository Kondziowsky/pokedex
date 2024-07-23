import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-error',
  standalone: true,
    imports: [
      MatButton,
      RouterLink,
      MatAnchor
    ],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageErrorComponent {

}
