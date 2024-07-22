import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: 'pokemon-list', loadComponent: () => import("./features/pokemon-list/pokemon-list.component").then((m) => m.PokemonListComponent) },
  { path: 'pokemon-details/:id', loadComponent: () => import("./features/pokemon-details/pokemon-details.component").then((m) => m.PokemonDetailsComponent) },
  { path: 'page-error', loadComponent: () => import("./core/components/page-error/page-error.component").then((m) => m.PageErrorComponent) },
  { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: '**', loadComponent: () => import("./core/components/page-not-found/page-not-found.component").then((m) => m.PageNotFoundComponent) }
];
