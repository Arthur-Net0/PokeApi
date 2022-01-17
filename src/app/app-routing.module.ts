import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonModule } from './features/pokemon/pokemon.module';


const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
