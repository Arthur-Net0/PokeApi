import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columnsToDisplay: string[];
  moves: MatTableDataSource<Move>;
  tableColumns: string[];
  numberPerPage: number = 17;
  headersClass = "moves-header"

  ngOnInit(): void {
    let afterGetMoves = (rawMoves: RawMove[]) => {
      let moves: Move[] = this.rawMovesToMoves(rawMoves);

      this.setTableColumnsFromMove(moves[0]);
      this.columnsToDisplay = this.tableColumns.slice();
      this.moves = new MatTableDataSource<Move>(moves)
      this.moves.paginator = this.paginator;
    }

    let afterGetData = (data: Data) => this.pokemonService.getMoves(data.pokemon).subscribe(afterGetMoves)

    this.activatedRoute.data.subscribe(afterGetData);
  }

  private filledEmptyTableSlots(moves: Move[], emptyObject = new Object): void {
    while (moves.length % this.numberPerPage !== 0) moves.push(emptyObject);
  }
  private rawMovesToMoves(rawMoves: RawMove[]): Move[] {
    let moves: Move[] = [];
    rawMoves.forEach( rawMove => moves.push(this.moveFromRawMove(rawMove)) )
    this.filledEmptyTableSlots(moves);
    return moves
  }
  private setTableColumnsFromMove(move): void {
    let keys = Object.keys(move)
    this.tableColumns = this.coreUtils.stringsFormats(keys);
  }
  private moveFromRawMove(rawMove: RawMove): Move {
    return {
      element: this.coreUtils.stringFormater(rawMove.type.name),
      name: this.coreUtils.stringFormater(rawMove.name, '-', ' '),
      category: this.coreUtils.stringFormater(rawMove.damage_class.name),
      pp: rawMove.pp,
      power: rawMove.power,
    };
  }


}
