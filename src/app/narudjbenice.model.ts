import { Stavka } from "./stavka.model";
export interface Narudjbenica{
  _id: string;
  datumKreiranja: Date;
  napomena: string;
  stavki: Stavka[]

}
