import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Proizvod } from './proizvod.model';
import { Stavka } from './stavka.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StavkaNarudjbeniceService {
  private stavkeNarudjbenice : Stavka[] =[];
  private stavkeUpdated = new Subject<Stavka[]>();

  constructor(private http: HttpClient) { }


 getStavkeNarudjbenice(){
    return [...this.stavkeNarudjbenice];
  }

  getStavkeUpdatedListener(){
    return this.stavkeUpdated.asObservable();
  }

  addStavkaNarudjbenice( idStavke, proizvod: Proizvod[], kolicina: number, napomenaStavke: string){
    const stavkaNarudjbenice : Stavka ={ idStavke:idStavke, proizvod: proizvod, kolicina: kolicina, napomenaStavke: napomenaStavke };
      this.stavkeNarudjbenice.push(stavkaNarudjbenice)
      this.stavkeUpdated.next([...this.stavkeNarudjbenice]);
  }

  deleteStavke(){
    this.stavkeNarudjbenice.splice(0, this.stavkeNarudjbenice.length)
  }

}
