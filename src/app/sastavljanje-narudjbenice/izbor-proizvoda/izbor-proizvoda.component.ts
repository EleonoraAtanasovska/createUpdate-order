import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proizvod } from '../../proizvod.model';
import { ProizvodService } from '../../proizvod.service';

@Component({
  selector: 'app-izbor-proizvoda',
  templateUrl: './izbor-proizvoda.component.html',
  styleUrls: ['./izbor-proizvoda.component.css']
})
export class IzborProizvodaComponent implements OnInit {

  proizvode: Proizvod[];
  proizvodSub: Subscription;
  izabraniIndex: any;
  nazivProizvoda: string;
  izabraniProizvod: any;
  id: string;
  navigation: any;
  idNarudjbenica: any;


  constructor( private proizvodService : ProizvodService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.proizvodService.getProizvod();
    this.proizvodSub = this.proizvodService.getProizvodeUpdatedListener()
    .subscribe((proizvod: Proizvod[]) =>{
      this.proizvode = proizvod;
    })


    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idNar')){
        this.idNarudjbenica=this.activatedRoute.snapshot.paramMap.get('idNar')
        this.navigation = '/izmene'
      }
     else{
       this.navigation = '/sast'
     }
    })

  }

    onPronadji(formaPronadji: NgForm){
    this.nazivProizvoda = formaPronadji.value.nazivProizvoda
  }
    onRowSelected(proizvod: any, i:any, nazivProizvoda){
      this.izabraniProizvod  = proizvod;
      this.izabraniIndex = i;
      this.nazivProizvoda = nazivProizvoda;
      this.id = this.izabraniProizvod._id
      console.log(this.id)
    }

}


