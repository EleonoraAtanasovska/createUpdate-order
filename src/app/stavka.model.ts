import { Proizvod } from "./proizvod.model";
export interface Stavka{
  idStavke: string,
  proizvod : Proizvod[],
  kolicina: number,
  napomenaStavke: string
}
