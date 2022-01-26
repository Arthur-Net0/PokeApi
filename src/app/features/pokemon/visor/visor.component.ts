import { Component, Input, OnInit, Output, Predicate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ObjectUtils } from 'src/app/core/utilities-lib/ObjectUtils';
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
  classHidden: string = 'd-none';

  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      shiny: false,
      gender: '',
    });
    let afterGetPokemon = (pokemon: Pokemon) =>
      this.spriteToSpriteLinks(pokemon.sprites);
    this.activatedRoute.data.subscribe((data) => afterGetPokemon(data.pokemon));
  }

  spriteToSpriteLinks(sprite: PokemonSprites): void {
    const newSpriteLinks: SpriteLinks[] = [];
    const notVersion: string[] = ['icons'];
    const verifySprite = (sprite: Sprite) => {
      return Boolean(sprite.front || sprite.back);
    };
    const validVersion = (version: string) => {
      return notVersion.indexOf(version) === -1;
    };

    Object.values(sprite.versions).forEach( generation => {
      ObjectUtils.for(generation, (gameVersion, rawSprites: AllSprites) => {
        const newSpriteLink: SpriteLinks = this.spriteLinksFromAll( rawSprites, gameVersion );

        if (validVersion(gameVersion) && verifySprite(newSpriteLink.default)) {
          newSpriteLinks.push(newSpriteLink)
        }
      })
    })

    this.spriteVersions = newSpriteLinks;
  }

  private spriteLinksFromAll(rawSpriteLink: AllSprites, game: string): SpriteLinks {
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
    const redefineSprite = () =>
      this.spriteVersions.map(
        (version) => (version.sprite = spriteFiltered(version))
      );

    redefineSprite();
  }

  revertImage() {
    const divImage = document.getElementById(this.divImage);
    const images = Object.values(divImage.children)

    let verifyOtherImagesSRC = (img: Element) => {
      let verification: boolean = false;
      const verifySRC = (element: Element) => Boolean(element.getAttribute('src'))
      const verifySRCs = (first: Element, second: Element) => Boolean(verifySRC(first) && verifySRC(second));

      images.forEach( element => verification = verifySRCs(element, img))

      return verification;
    };
    images.forEach((img: Element) => {
      const imageIsHidden = img.classList.contains(this.classHidden);

      if (verifyOtherImagesSRC(img)) {
        if (imageIsHidden) {
          img.classList.remove(this.classHidden);
        } else {
          img.classList.add(this.classHidden);
        }
      }
    })
  }
}
