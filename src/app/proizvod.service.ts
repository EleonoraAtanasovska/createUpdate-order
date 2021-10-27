import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proizvod } from './proizvod.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProizvodService {

  proizvod : Proizvod[];
  proizvodeUpdated = new Subject<Proizvod[]>()

  constructor(private http: HttpClient) { }


  getProizvod(){
    this.http.get<{proizvode: any}>('http://localhost:3000/api/proizvod')
    .pipe(map((proizvodData) =>{
      return proizvodData.proizvode.map(proizvod =>
        { return {
          _id: proizvod._id,
          nazivProizvoda: proizvod.nazivProizvoda,
          jedinicaMere: proizvod.jedinicaMere,
          cena: proizvod.cena
        }})
    }))
    .subscribe((transfProizvodData) =>{
      this.proizvod = transfProizvodData;
      this.proizvodeUpdated.next([...this.proizvod]);
    })
  }

  getProizvodbyId(id: string){
    return  {...this.proizvod.find(p => p._id === id)}
  }

  getProizvodeUpdatedListener(){
    return this.proizvodeUpdated.asObservable();
  }

}


