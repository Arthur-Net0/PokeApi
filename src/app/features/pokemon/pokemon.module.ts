import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { VisorComponent } from './visor/visor.component';
import { BasestatsComponent } from './basestats/basestats.component';
import { MovesComponent } from './moves/moves.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { ViewComponent } from './view/view.component';
import { AbilitiesComponent } from './abilities/abilities.component';


@NgModule({
  declarations: [VisorComponent, BasestatsComponent, MovesComponent, AllFormsComponent, ViewComponent, AbilitiesComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule
  ]

})
export class PokemonModule { }
