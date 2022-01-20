import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsBaseStats } from 'src/app/core/models/ChartsBaseStats';
import { Pokemon } from 'src/app/core/models/Pokemon';
import { UnifiedBaseStats } from 'src/app/core/models/UnifiedBaseStats';

@Component({
  selector: 'app-basestats',
  templateUrl: './basestats.component.html',
  styleUrls: ['./basestats.component.css']
})
export class BasestatsComponent implements OnInit {

  chartType: string = 'pie';
  dataSets: Array<any>;
  simpleSets: Array<any>;
  labels: Array<any>;
  colors: Array<any>;
  options: Object = {responsive: true }
  legend: boolean = false
  unifiedBaseStats: Array<UnifiedBaseStats>;
  colorBaseStats = {
    'hp': '#FF5959',
    'attack': '#F5AC78',
    'defense': '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    'speed': '#FA92B2',
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe( params => {
      let pokemon: Pokemon = params.pokemon;
      let newDatasets = [];
      let newLabels = [];
      let newColors = [];
      let unified: Array<UnifiedBaseStats> = []

      pokemon.stats.forEach( value => {
        newDatasets.push(value.base_stat);
        newLabels.push(this.stringFormater(value.stat.name))
        newColors.push(this.colorBaseStats[value.stat.name])
        unified.push({
          name: value.stat.name,
          points: value.base_stat,
          color: this.colorBaseStats[value.stat.name]
        })
      })

      this.dataSets = [{ data: newDatasets}];
      this.labels = newLabels;
      this.colors = [{backgroundColor: newColors}];
      this.unifiedBaseStats = unified;
    })


  };
  stringFormater(word:string) {
    if (word.indexOf('-') != -1) {
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
    else {
      return word[0].toUpperCase() + word.slice(1)
    }
  }
}
