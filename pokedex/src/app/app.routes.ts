import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "@core/components/page-not-found/page-not-found.component";
import {PokemonListComponent} from "@features/pokemon-list/pokemon-list.component";

export const routes: Routes = [
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: '', redirectTo: '/pokemon-list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
