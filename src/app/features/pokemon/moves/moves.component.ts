import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Move } from 'src/app/core/models/Move';
import { PokemonService } from 'src/app/core/services/pokemon.service';

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

  @ViewChild(MatTable) table: MatTable<MovesComponent>;

  columnsToDisplay: string[];
  moves = [];
  tableColumns: string[];

  ngOnInit(): void {
    let t: Move = {
      element: 'terra',
      name: 'murro de barro',
      category: 'normal',
      pp: 10,
      power: 30,
    };
    this.moves.push(t);
    this.activatedRoute.data.subscribe((value) => {
      let _moves = [];
      this.pokemonService.getMoves(value.pokemon).subscribe( rawMoves => {
        for( let rawMove of rawMoves ) {
          let move: Move = {
            element: rawMove['type']['name'],
            name: rawMove['name'],
            category: rawMove['damage_class']['name'],
            pp: rawMove['pp'],
            power: rawMove['power'],
          };
          this.moves.push(move);
        }
      })


      // this.table.renderRows();
    });

    this.tableColumns = Object.keys(this.moves[0]);
    this.columnsToDisplay = this.tableColumns.slice();
  }
}
