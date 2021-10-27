import { Pipe, PipeTransform } from '@angular/core';
import { Proizvod } from './proizvod.model';



@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {


  transform(Proizvode: Proizvod[], searchValue: string): Proizvod[]{
    if(!Proizvode || !searchValue){
      return  Proizvode;
    }

  return Proizvode.filter(proizvod => proizvod.nazivProizvoda === searchValue)

}}
