import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { NarudjbenicaService } from '../narudjbenica.service';
import { StavkaNarudjbeniceService } from '../stavka-narudjbenice.service';
import { Subscription } from 'rxjs';
import { ProizvodService } from '../proizvod.service';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-sastavljanje-narudjbenice',
  templateUrl: './sastavljanje-narudjbenice.component.html',
  styleUrls: ['./sastavljanje-narudjbenice.component.css']
})
export class SastavljanjeNarudjbeniceComponent implements OnInit {
 formaNarudjbenice: FormGroup;
 stavke = new FormArray([]);
 sacuvanaStavka:  any;
 private stavkaSub: Subscription;
 izabraniProizvod: any;
 private mode ='izaberi';
 private idProizvoda: string;
  nazivProizvoda: string;
  jedinicaMere: string;
  cena:number
  a:any

  constructor(private narudjbenicaService : NarudjbenicaService, private stavkaService : StavkaNarudjbeniceService,public activatedRoute: ActivatedRoute,
    private proizvodService: ProizvodService) { }

  ngOnInit(): void {
    this.sacuvanaStavka = this.stavkaService.getStavkeNarudjbenice();
    this.stavkaSub = this.stavkaService.getStavkeUpdatedListener()
    .subscribe((stavke: any) =>{
      this.sacuvanaStavka= stavke;
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idProizvoda')){
        this.idProizvoda =this.activatedRoute.snapshot.paramMap.get('idProizvoda') || ''
        this.izabraniProizvod =this.proizvodService.getProizvodbyId(this.idProizvoda);
        this.mode ='izabranproizvod'
        this.nazivProizvoda = this.izabraniProizvod.nazivProizvoda;
        this.jedinicaMere = this.izabraniProizvod.jedinicaMere;
        this.cena = this.izabraniProizvod.cena
      }else{
        this.nazivProizvoda ='';
        this.jedinicaMere ='';
        this.cena = 0;
        this.mode = 'izaberi';
        this.idProizvoda = '';
      }})


      this.stavke.push(new FormGroup({
        idStavke: new FormControl({value:this.a, disabled:true}),
        nazivProizvoda: new FormControl({value: this.nazivProizvoda, disabled:true}),
        jedinicaMere: new FormControl({ value: this.jedinicaMere, disabled: true}),
        cena: new FormControl({ value: this.cena, disabled: true}),
        kolicina: new FormControl(),
        napomenaStavke: new FormControl()
        }))




        this.formaNarudjbenice = new FormGroup({
        idNarudjbenice: new FormControl('',Validators.required),
        datumKreiranja: new FormControl(),
        napomena: new FormControl(),
        stavke: this.stavke
        })

        let idNar:any;
        let datum:any;
        let napomena:any;

        idNar = this.getSavedValueIdNar();
        datum = this.getSavedValueDatum();
        napomena = this.getSavedValueNapomena();

        this.formaNarudjbenice.controls['idNarudjbenice'].setValue(idNar);
        this.formaNarudjbenice.controls['datumKreiranja'].setValue(datum);
        this.formaNarudjbenice.controls['napomena'].setValue(napomena);


      }

    get controls() {
      return (<FormArray>this.formaNarudjbenice.get('stavke')).controls;
  }

  onPotvrdi(){
    this.narudjbenicaService.addNarudjbenice(
      this.formaNarudjbenice.controls.idNarudjbenice.value,
      this.formaNarudjbenice.controls.datumKreiranja.value,
      this.formaNarudjbenice.controls.napomena.value,
      this.sacuvanaStavka
    )
    this.formaNarudjbenice.reset();
    this.sacuvanaStavka = [];
    localStorage.clear();
    this.stavke.reset();
    this.stavkaService.deleteStavke();

  }

  onUnesiStavku(i){
    this.a = this.uuidv4()

      this.stavkaService.addStavkaNarudjbenice(
      this.a,
      this.izabraniProizvod,
      this.formaNarudjbenice.controls.stavke.value[i].kolicina,
      this.formaNarudjbenice.controls.stavke.value[i].napomenaStavke,
      )
      this.stavke.reset();


  }

  onOdustani(){
    this.sacuvanaStavka = [];
    this.formaNarudjbenice.reset();
    this.stavke.reset();
    localStorage.clear();
    this.stavkaService.deleteStavke();
  }


  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }

    saveValueIdNar(){
      let zacuvanaIdNarudjbenica: any;
      zacuvanaIdNarudjbenica = this.formaNarudjbenice.controls.idNarudjbenice.value
      localStorage.setItem('zacuvanaIdNarudjbenica', zacuvanaIdNarudjbenica)

    }

    ngOnDestroy(){
      this.stavkaSub.unsubscribe();
    }

    getSavedValueIdNar(){
      if(!localStorage.getItem('zacuvanaIdNarudjbenica')){
        return ""
      }
      return localStorage.getItem('zacuvanaIdNarudjbenica')
    }

    saveValueDatum(){
      let zacuvanDatum: any;
      zacuvanDatum = this.formaNarudjbenice.controls.datumKreiranja.value
      localStorage.setItem('zacuvanDatum', zacuvanDatum)
    }

    getSavedValueDatum(){
      if(!localStorage.getItem('zacuvanDatum')){
        return ""
      }
      return localStorage.getItem('zacuvanDatum')
    }

    saveValueNapomena(){
      let zacuvanaNapomena: any;
      zacuvanaNapomena = this.formaNarudjbenice.controls.napomena.value
      localStorage.setItem('zacuvanaNapomena', zacuvanaNapomena)
    }

    getSavedValueNapomena(){
      if(!localStorage.getItem('zacuvanaNapomena')){
        return ""
      }
      return localStorage.getItem('zacuvanaNapomena')
    }

}
