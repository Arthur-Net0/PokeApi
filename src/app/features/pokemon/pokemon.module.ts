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
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    ChartsModule,
    WavesModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ]

})
export class PokemonModule { }
