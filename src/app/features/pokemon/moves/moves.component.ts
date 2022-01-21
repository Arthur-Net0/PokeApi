import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Move } from 'src/app/core/models/Move';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CoreUtilsService } from 'src/app/core/services/core-utils.service';
import { RawMove } from 'src/app/core/models/RawMoves';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css'],
})
export class MovesComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    public coreUtils: CoreUtilsService
  ) {}

  // dataSource = new MatTableDataSource<Move>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  columnsToDisplay: string[];
  moves: MatTableDataSource<Move>;
  tableColumns: string[];
  numberPerPage: number = 17;
  headersClass = "moves-header"

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((value) => {
      let rawMovesToMoves = (rawMoves: RawMove[]):Move[] => {
        let moves: Move[] = [];
        for( let rawMove of rawMoves ) {
          let move: Move = {
            element: this.coreUtils.stringFormater(rawMove.type.name),
            name: this.coreUtils.stringFormater(rawMove.name, '-', ' '),
            category: this.coreUtils.stringFormater(rawMove.damage_class.name),
            pp: rawMove.pp,
            power: rawMove.power,
          };
          moves.push(move);
        }
        while (moves.length % this.numberPerPage !== 0) {
          moves.push({})
        }
        return moves
      }

      let afterGetMoves = (rawMoves: RawMove[]) => {
        let moves: Move[] = rawMovesToMoves(rawMoves);

        this.tableColumns = this.coreUtils.stringsFormats(Object.keys(moves[0]));
        this.columnsToDisplay = this.tableColumns.slice();
        this.moves = new MatTableDataSource<Move>(moves)
        this.moves.paginator = this.paginator;
      }

      this.pokemonService.getMoves(value.pokemon).subscribe(afterGetMoves)
    });
  }

}
