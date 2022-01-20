import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from 'src/app/core/models/Ability';
import { Pokemon } from 'src/app/core/models/Pokemon';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
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

  stringFormater(word:string) {
    if (word.indexOf('-') != -1) {
      if (word === 'ultra-sun-ultra-moon') {
        return 'Ultra-Sun/Ultra-Moon'
      }
      else {
        let words: Array<string> = word.split('-')
        let _words: Array<string> = [];

        words.forEach( word => {
          let _word = word[0].toUpperCase() + word.slice(1)
          _words.push(_word)
        })

        let _word: string = _words[0];
        for(let i=1; i < _words.length; i++) {
          _word += ' ' + _words[i]
        }
        return _word
      }
    }
    else {
      return word[0].toUpperCase() + word.slice(1)
    }
  }
}
