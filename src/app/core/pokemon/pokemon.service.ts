import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: ,
  ) {}

  all() {
    this.http.get('/api/')
  }
}
