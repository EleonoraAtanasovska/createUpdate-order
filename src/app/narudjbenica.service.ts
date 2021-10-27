import { Injectable } from '@angular/core';
import { Narudjbenica } from './narudjbenice.model';
import { Stavka } from './stavka.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NarudjbenicaService {
  private narudjbenice: Narudjbenica[] =[];
  private narudjbenicaUpdated = new Subject<Narudjbenica[]>();

  constructor(private http: HttpClient) { }

  addNarudjbenice(idNarudjbenice: string, datumKreiranja: Date, napomena: string, stavki: Stavka[]) {
    const narudjbenica: Narudjbenica = {_id: idNarudjbenice, datumKreiranja: datumKreiranja, napomena:napomena, stavki: stavki};
    this.http.post<{message:string}>("http://localhost:3000/api/narudjbenice", narudjbenica)
    .subscribe((responseData) => {
      console.log("Narudjbenica je sacuvana");
    });
  }

  getNarudjbeniceById(id: string){
    return this.http.get<{narudjbenica: Narudjbenica[]}>('http://localhost:3000/api/narudjbenica/'+ id)
    .pipe(map((response) => {return response.narudjbenica}))
  }

  updateNarudjbenica(idNarudjbenice: string, datumKreiranja: Date, napomena: string, stavki: Stavka[]){
    const narudjbenica: Narudjbenica = {_id: idNarudjbenice, datumKreiranja: datumKreiranja, napomena:napomena, stavki: stavki};
    this.http.put<{message:string}>('http://localhost:3000/api/narudjbenice/' + idNarudjbenice, narudjbenica)
    .subscribe(response => {
      console.log("Narudjbenica je sacuvana")
    });
  }


  deleteNarudjbenica(id: string){
    this.http.delete('http://localhost:3000/api/izbrisinarudjbenica/' + id)
    .subscribe(()=>{
      console.log('Narudjbenica je izbrisana')
    });
  }
}

