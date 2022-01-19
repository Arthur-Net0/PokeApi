import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { VisorComponent } from './visor/visor.component';
import { BasestatsComponent } from './basestats/basestats.component';
import { MovesComponent } from './moves/moves.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { ViewComponent } from './view/view.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [VisorComponent, BasestatsComponent, MovesComponent, AllFormsComponent, ViewComponent, AbilitiesComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTableModule,
  ]

})
export class PokemonModule { }
