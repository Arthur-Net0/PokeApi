import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvolutionChain } from 'src/app/core/models/EvolutionChain';
import { Pokemon } from 'src/app/core/models/Pokemon';
import { CoreUtilsService } from 'src/app/core/services/core-utils.service';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-all-forms',
  templateUrl: './all-forms.component.html',
  styleUrls: ['./all-forms.component.css'],
})
export class AllFormsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    public coreUtils: CoreUtilsService
  ) {}

  evolutionChain: EvolutionChain;

  firstFormStyle = {};
  secondFormStyle = {};
  thirdFormStyle = {};

  firstFormLink = '';
  secondFormLink = '';
  thirdFormLink = '';

  ngOnInit(): void {
    let pokemon: Pokemon;
    let afterGetEvolutionChain = (urlToChain) =>
      this.pokemonService.httpGet(urlToChain).subscribe(formatToEvolutionChain);
    let afterGetSpecies = (specie) =>
      afterGetEvolutionChain(specie.evolution_chain.url);
    let afterResolver = (params) => {
      pokemon = params.pokemon;
      this.pokemonService
        .httpGet(pokemon.species.url)
        .subscribe(afterGetSpecies);
    };

    let formatToEvolutionChain = (jsonChain) => {
      let evolutionChain: EvolutionChain = {};
      let firstForm = jsonChain.chain.species.name;

      evolutionChain.firstForm = {
        name: firstForm,
        isActivate: firstForm === pokemon.name,
      };

      this.firstFormStyle = evolutionChain.firstForm.isActivate
        ? { 'background-color': 'red', color: 'white' }
        : null;
      this.firstFormLink = `/pokemon/${evolutionChain.firstForm.name}`;

      if (jsonChain.chain.evolves_to.length) {
        let secondForm = jsonChain.chain.evolves_to[0].species.name;

        evolutionChain.secondForm = {
          name: secondForm,
          isActivate: secondForm === pokemon.name,
        };

        this.secondFormStyle = evolutionChain.secondForm.isActivate
          ? { 'background-color': 'red', color: 'white' }
          : null;
        this.secondFormLink = `/pokemon/${evolutionChain.secondForm.name}`;

        if (jsonChain.chain.evolves_to[0].evolves_to.length) {
          let thirdForm =
            jsonChain.chain.evolves_to[0].evolves_to[0].species.name;
          evolutionChain.thirdForm = {
            name: thirdForm,
            isActivate: thirdForm === pokemon.name,
          };

          this.thirdFormStyle = evolutionChain.thirdForm.isActivate
            ? { 'background-color': 'red', color: 'white' }
            : null;
          this.thirdFormLink = `/pokemon/${evolutionChain.thirdForm.name}`;
        }
      }
      this.evolutionChain = evolutionChain;
    };

    this.activatedRoute.data.subscribe(afterResolver);
  }

}
