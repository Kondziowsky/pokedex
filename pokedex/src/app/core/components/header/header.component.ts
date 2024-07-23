import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatCardImage} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatCardImage, NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
