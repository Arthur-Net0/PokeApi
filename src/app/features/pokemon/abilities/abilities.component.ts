import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from 'src/app/core/models/Ability';
import { Pokemon } from 'src/app/core/models/Pokemon';
import { CoreUtilsService } from 'src/app/core/services/core-utils.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public coreUtils: CoreUtilsService
  ) { }

  abilities: Ability[];
  cardStyle = {
    'width': '160px',
    'margin': '0 20px',
    'text-align': 'center',
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( params => {
      let pokemon = params.pokemon as Pokemon
      let abilities: Ability[] = [];
      pokemon.abilities.forEach( value => {
        let ability: Ability = {
          name: value.ability.name,
          isHidden: (value.is_hidden),
        }
        abilities.push(ability)
      })
      this.abilities = abilities
    })
  }


}
