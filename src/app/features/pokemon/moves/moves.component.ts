import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Move } from 'src/app/core/models/Move';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css'],
})
export class MovesComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ) {}

  // dataSource = new MatTableDataSource<Move>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  columnsToDisplay: string[];
  moves: MatTableDataSource<Move>;
  tableColumns: string[];
  numberPerPage: number = 15;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((value) => {
      let moves = [];
      this.pokemonService.getMoves(value.pokemon).subscribe( rawMoves => {
        for( let rawMove of rawMoves ) {
          let move: Move = {
            "Element": this.stringFormater(rawMove['type']['name']),
            'Name': this.stringFormater(rawMove['name']),
            'Category': this.stringFormater(rawMove['damage_class']['name']),
            'PP': rawMove['pp'],
            'Power': rawMove['power'],
          };
          moves.push(move);
        }
        while (moves.length % this.numberPerPage !== 0) {
          moves.push({})
        }
        this.tableColumns = Object.keys(moves[0]);
        this.columnsToDisplay = this.tableColumns.slice();
        this.moves = new MatTableDataSource<Move>(moves)
        this.moves.paginator = this.paginator;
      })
    });
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
