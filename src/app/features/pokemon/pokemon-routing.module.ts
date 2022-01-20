import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';


import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/Pokemon';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Move } from 'src/app/core/models/Move';

@Injectable({ providedIn: 'root' })
export class PokemonResolver implements Resolve<Pokemon> {
  constructor(public pokemonService: PokemonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pokemon> {
    return this.pokemonService.getPokemon(route.params.pokeSearch);
  }
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewComponent,
      },
      {
        path: ':pokeSearch',
        component: ViewComponent,
        resolve: {
          pokemon: PokemonResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
