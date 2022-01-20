import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/Pokemon';
import { forkJoin, Observable, of } from 'rxjs';
import { PokemonSprites } from '../models/PokemonSprites';
import { Move } from '../models/Move';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // all() {
  //   return this.http.get(`${this.environment.pokeApi}`)
  // }

  httpGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemon(pokeSearch): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${environment.pokeApi}/pokemon/${pokeSearch}`
    );
  }

  getMoves(pokemon): Observable<Object[]> {
    let observables: Observable<Object>[] = [];
    for (let value of pokemon.moves) {
      observables.push(this.httpGet(value.move.url));
    }

    return forkJoin(observables);
  }

}
