import { NameAndUrl } from "./Name&Url";

export interface RawMove {
  type: NameAndUrl,
  name: string,
  damage_class: NameAndUrl,
  pp: number,
  power: number
}
