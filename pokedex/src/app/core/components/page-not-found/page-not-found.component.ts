import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatAnchor
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
    /* TODO -> handle with page not found */
}
