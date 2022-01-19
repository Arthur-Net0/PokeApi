import { Ability } from "./Ability";
import { BaseStats } from "./BaseStats";
import { PokeMove } from "./PokeMove";
import { NameAndUrl } from "./Name&Url";
import { PokemonSprites } from "./PokemonSprites";
import { PokeType } from "./PokeType";

export interface Pokemon {
  abilities: Ability[],
  moves: PokeMove[],
  name: string,
  id: number,
  species: NameAndUrl,
  sprites: PokemonSprites,
  stats: BaseStats[],
  types: PokeType[],
  weight: number;
}
