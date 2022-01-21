import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AllSprites } from 'src/app/core/models/AllSprites';
import { Pokemon } from 'src/app/core/models/Pokemon';
import { PokemonSprites } from 'src/app/core/models/PokemonSprites';
import { Sprite } from 'src/app/core/models/Sprite';
import { SpriteLinks } from 'src/app/core/models/SpriteLinks';
import { CoreUtilsService } from 'src/app/core/services/core-utils.service';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonResolver } from '../pokemon-routing.module';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    public coreUtils: CoreUtilsService
    ) { }

  spriteVersions: SpriteLinks[];
  pokeSearch: String;
  formFilter: FormGroup;
  divImage = "imageins"

  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      shiny: [false],
      gender: '',
    })

    let afterGetPokemon = (pokemon:Pokemon) => {
      this.spriteToSpriteLinks(pokemon.sprites)
    }

    this.activatedRoute.data.subscribe( resolvers => afterGetPokemon(resolvers.pokemon))

  }

  spriteToSpriteLinks(sprite: PokemonSprites): void {
    let newSpriteLinks: SpriteLinks[] = [];
    let versions = Object.keys(sprite.versions)
    for( let key of versions) {
      let games = Object.keys(sprite.versions[key])

      for(let game of games) {
        if (game !== 'icons') {
          let sprite_link: AllSprites = sprite.versions[key][game]

          let defaultSprite: Sprite = {
            front: sprite_link.front_default,
            back: sprite_link.back_default
          };

          let shinySprite: Sprite = {
            front: sprite_link.front_shiny,
            back: sprite_link.back_shiny
          };

          let shinyFemaleSprite: Sprite = {
            front: sprite_link.front_shiny_female,
            back: sprite_link.back_shiny_female
          };

          let femaleSprite: Sprite = {
            front: sprite_link.front_female,
            back: sprite_link.back_female
          }

          let newSpriteLink: SpriteLinks = {
            version: game,
            sprite: defaultSprite,
            default: defaultSprite,
            shiny: shinySprite,
            shiny_female: shinyFemaleSprite,
            female: femaleSprite,
          };

          newSpriteLinks.push(newSpriteLink);
        }
      }


    }
    this.spriteVersions = newSpriteLinks;
  }

  reviewShowedSprite() {
    let filter = this.formFilter.value

    let verifySprite = (sprite: Sprite) => {
      if (sprite.front !== undefined || sprite.back !== undefined) {
        return true
      }
      else {
        return false
      }
    }
    let spriteFiltered = (version: SpriteLinks) => {
      if (filter.shiny) {
        if ( filter.gender === "female" && verifySprite(version.shiny_female)) {
          return version.shiny_female
        }
        else if (verifySprite(version.shiny)){
          return version.shiny
        }
        else {
          return version.default
        }
      }
      else {
        if (filter.gender === "female" && verifySprite(version.female)) {
          return version.female
        }
        else {
          return version.default
        }
      }
    }

    if (filter.shiny && filter.gender === 'female') {
      this.spriteVersions.map( version => version.sprite = spriteFiltered(version))
    }
    else if ( filter.shiny ) {
      this.spriteVersions.map(version => version.sprite = spriteFiltered(version))
    }
    else if ( filter.gender === 'female' ) {
      this.spriteVersions.map(version => version.sprite = spriteFiltered(version))
    }
    else {
      this.spriteVersions.map( version => version.sprite = version.default )
    }

  }

  revertImage(event) {
    let images = document.getElementById(this.divImage).children

    let verifyOtherImagesSRC = (img: HTMLElement) => {
      for( let i in Object.keys(images)) {
        let toVerify = images[i]
        if (toVerify !== img && Boolean(toVerify.getAttribute('src')) && Boolean(img.getAttribute('src')))  {
          return true
        }
      }
      return false
    }

    for ( let i in Object.keys(images)) {
      let image = images[i] as HTMLElement
      if (image.classList.contains('d-none') && verifyOtherImagesSRC(image)) {
        image.classList.remove('d-none')
      }
      else if (!image.classList.contains('d-none') && verifyOtherImagesSRC(image)) {
        image.classList.add('d-none')
      }
    }
  }

}


