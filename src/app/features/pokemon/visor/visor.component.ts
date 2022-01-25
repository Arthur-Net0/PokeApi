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
  styleUrls: ['./visor.component.css'],
})
export class VisorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    public coreUtils: CoreUtilsService
  ) {}

  spriteVersions: SpriteLinks[];
  pokeSearch: String;
  formFilter: FormGroup;
  divImage = 'imagens';

  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      shiny: false,
      gender: '',
    });

    let afterGetPokemon = (pokemon: Pokemon) => this.spriteToSpriteLinks(pokemon.sprites);
    this.activatedRoute.data.subscribe((data) => afterGetPokemon(data.pokemon));
  }

  spriteToSpriteLinks(sprite: PokemonSprites): void {
    const newSpriteLinks: SpriteLinks[] = [];
    const versions = Object.keys(sprite.versions);
    const notVersion: string[] = ['icons'];
    const verifySprite = (sprite: Sprite) => {
      return sprite.front || sprite.back;
    };
    const validVersion = (version: string) => {
      return notVersion.indexOf(version) === -1;
    };
    for (let key of versions) {
      const games = Object.keys(sprite.versions[key]);

      for (let version of games) {
        const rawSpritesLinks: AllSprites = sprite.versions[key][version];
        const newSpriteLink: SpriteLinks = this.spriteLinksFromAll(
          rawSpritesLinks,
          version
        );

        if (validVersion(version) && verifySprite(newSpriteLink.default)) {
          newSpriteLinks.push(newSpriteLink);
        }
      }
    }
    this.spriteVersions = newSpriteLinks;
  }

  private spriteLinksFromAll(
    rawSpriteLink: AllSprites,
    game: string
  ): SpriteLinks {
    let defaultSprite: Sprite = {
      front: rawSpriteLink.front_default,
      back: rawSpriteLink.back_default,
    };

    let shinySprite: Sprite = {
      front: rawSpriteLink.front_shiny,
      back: rawSpriteLink.back_shiny,
    };

    let shinyFemaleSprite: Sprite = {
      front: rawSpriteLink.front_shiny_female,
      back: rawSpriteLink.back_shiny_female,
    };

    let femaleSprite: Sprite = {
      front: rawSpriteLink.front_female,
      back: rawSpriteLink.back_female,
    };

    let newSpriteLink: SpriteLinks = {
      version: game,
      sprite: defaultSprite,
      default: defaultSprite,
      shiny: shinySprite,
      shiny_female: shinyFemaleSprite,
      female: femaleSprite,
    };
    return newSpriteLink;
  }

  reviewShowedSprite() {
    const filter = this.formFilter.value;
    const isFemale: boolean = filter.gender === 'female';
    const verifySprite = (sprite: Sprite) => sprite.front || sprite.back;
    const spriteFiltered = (version: SpriteLinks) => {
      if (filter.shiny) {
        if (isFemale && verifySprite(version.shiny_female)) {
          return version.shiny_female;
        } else if (verifySprite(version.shiny)) {
          return version.shiny;
        }
      } else if (isFemale && verifySprite(version.female)) {
        return version.female;
      }
      return version.default;
    };
    const redefineSprite = () => this.spriteVersions.map( version => version.sprite = spriteFiltered(version) );

    redefineSprite();
  }

  revertImage() {
    const images = document.getElementById(this.divImage).children;

    let verifyOtherImagesSRC = (img: HTMLElement) => {
      for (let i in Object.keys(images)) {
        let toVerify = images[i];
        const verifySRC = (): boolean => {
          return Boolean(toVerify.getAttribute('src')) && Boolean(img.getAttribute('src'))
        }
        if (toVerify !== img && verifySRC()) {
          return true;
        }
      }
      return false;
    };

    for (let i in Object.keys(images)) {
      const image = images[i] as HTMLElement;
      const otherImageSRC: boolean = verifyOtherImagesSRC(image)
      const imageIsHidden = image.classList.contains('d-none')

      if ( imageIsHidden && otherImageSRC) {
        image.classList.remove('d-none');
      } else if ( !imageIsHidden && otherImageSRC ) {
        image.classList.add('d-none');
      }
    }
  }
}
