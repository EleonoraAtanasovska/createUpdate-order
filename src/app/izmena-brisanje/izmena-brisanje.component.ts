import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NarudjbenicaService } from '../narudjbenica.service';
import { ProizvodService } from '../proizvod.service';
import * as moment from "moment";

@Component({
  selector: 'app-izmena-brisanje',
  templateUrl: './izmena-brisanje.component.html',
  styleUrls: ['./izmena-brisanje.component.css']
})
export class IzmenaBrisanjeComponent implements OnInit {
  formaNarudjbenice: FormGroup;
  stavke = new FormArray([]);
  narudjbenicaSub: Subscription;
  narudjbenice: any;
  private mode = 'pocetnastrana';
  stavkeNarudjbenice : any;
  datumKreiranja: string;
  napomena: string
  izabraniIndex: any
  izabranaStavka: any;
  idNarudjbenice: any;
  idProizvoda: any
  nazivProizvoda: any;
  jedinicaMere: any;
  cena: any
  proizvod: any;
  sacuvanaStavka:any;
  stavkaSub: Subscription;
  idStavke: string;

  constructor( private narudjbenicaService: NarudjbenicaService,public activatedRoute: ActivatedRoute, private proizvodService: ProizvodService) { }

  ngOnInit(): void {
     this.initForm();
     let id = this.getSavedValueIdNar();
     let datum = this.getSavedValueDatum();
     let napomenaN = this.getSavedValueNapomena()
     let sacuvaneStavke = this.getSavedValueStavke();
     let izabranaaStavka = this.getSavedValueStavka();

     this.formaNarudjbenice.controls['idNarudjbenice'].setValue(id);
     this.formaNarudjbenice.controls['datumKreiranja'].setValue(datum);
     this.formaNarudjbenice.controls['napomena'].setValue(napomenaN);
     this.stavkeNarudjbenice = sacuvaneStavke
     this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('idProizvod')){
          this.mode ='izabranproizvod';
          this.idProizvoda =this.activatedRoute.snapshot.paramMap.get('idProizvod') || ''
          this.proizvod =this.proizvodService.getProizvodbyId(this.idProizvoda);
          this.nazivProizvoda = this.proizvod.nazivProizvoda;
          this.jedinicaMere = this.proizvod.jedinicaMere;
          this.cena = this.proizvod.cena
          this.idStavke = izabranaaStavka.idStavke
          console.log(this.nazivProizvoda)
          this.stavke.patchValue([
            {
            idStavke: this.idStavke,
            nazivProizvoda: this.nazivProizvoda,
            jedinicaMere: this.jedinicaMere,
            cena: this.cena,
            }
          ]);
      }
      this.mode ==='pocetnastrana'
      })

    }
      private initForm() {
        this.formaNarudjbenice = new FormGroup({
        idNarudjbenice: new FormControl(),
        datumKreiranja: new FormControl(),
        napomena: new FormControl(),
        stavke: this.stavke
         })


        this.stavke.push(new FormGroup({
        idStavke: new FormControl({value:this.idStavke, disabled:true}),
        nazivProizvoda: new FormControl({value: this.nazivProizvoda, disabled:true}),
        jedinicaMere: new FormControl({value: this.jedinicaMere, disabled:true}),
        cena: new FormControl({value: this.cena, disabled:true}),
        kolicina: new FormControl(),
        napomenaStavke: new FormControl()
        }));
      }


    get controls() {
      return (<FormArray>this.formaNarudjbenice.get('stavke')).controls;
  }


  onPronadji(formaNarudjbenice: FormGroup){
    this.narudjbenice = this.narudjbenicaService.getNarudjbeniceById(this.formaNarudjbenice.value.idNarudjbenice)
    .subscribe(result => {
      this.narudjbenice = result;
      if (this.narudjbenice['stavki']){
        this.stavkeNarudjbenice = this.narudjbenice.stavki
      }
       this.idNarudjbenice = this.narudjbenice._id
       this.datumKreiranja= moment(this.narudjbenice.datumKreiranja, "YYYY-MM-DD[T00:00:000Z]").format("YYYY-MM-DD");
       this.napomena = this.narudjbenice.napomena;
       this.formaNarudjbenice.controls['datumKreiranja'].setValue(this.datumKreiranja);
       this.formaNarudjbenice.controls['napomena'].setValue(this.napomena);
       localStorage.setItem('unesenId', this.idNarudjbenice);
       localStorage.setItem('unesenDatum', this.datumKreiranja);
       localStorage.setItem('unesenaNapomena', this.napomena);
       localStorage.setItem('stavke', JSON.stringify(this.stavkeNarudjbenice));
    })
  }

  onRowSelected(stavka: any, i:any){

    this.izabranaStavka  = stavka;
    this.izabraniIndex = i;
    this.nazivProizvoda =  stavka.proizvod.nazivProizvoda
    this.jedinicaMere = stavka.proizvod.jedinicaMere
    this.cena= stavka.proizvod.cena
    this.idStavke = stavka.idStavke
    this.stavke.patchValue([
      {
      idStavke: this.idStavke,
      nazivProizvoda: this.nazivProizvoda,
      jedinicaMere: this.jedinicaMere,
      cena: this.cena,
      napomenaStavke: stavka.napomenaStavke,
      kolicina: stavka.kolicina}
    ]);

    localStorage.setItem('stavka', JSON.stringify(this.izabranaStavka));
    localStorage.setItem('izabraniIndex', this.izabraniIndex)
  }

  onUbaciStavku(i:any, nazivProizvoda,jedinicaMere,cena , kolicina: number, napomenaStavke: string){
    this.idStavke = this.uuidv4()
    const stavkaNar = {idStavke: this.idStavke, proizvod:{nazivProizvoda ,jedinicaMere,cena}, kolicina: kolicina, napomenaStavke:napomenaStavke};
    this.stavkeNarudjbenice.push(stavkaNar)
    localStorage.removeItem('stavka');
    this.stavke.reset();
    localStorage.setItem('stavke', JSON.stringify(this.stavkeNarudjbenice));
  }

  onIzmeniStavku(i:any,idStavke, nazivProizvoda,jedinicaMere,cena , kolicina: number, napomenaStavke: string){
    const stavkaNar = {idStavke:idStavke, proizvod:{nazivProizvoda ,jedinicaMere,cena}, kolicina: kolicina, napomenaStavke:napomenaStavke};
    const foundIndex = this.stavkeNarudjbenice.findIndex(n => n.idStavke === idStavke)
    this.stavkeNarudjbenice[foundIndex] = stavkaNar
    console.log(idStavke);
    localStorage.removeItem('stavka');
    localStorage.setItem('stavke', JSON.stringify(this.stavkeNarudjbenice));
    this.stavke.reset();


  }

  onIzbrisiStavku(idStavke){
    const foundIndex = this.stavkeNarudjbenice.findIndex(n => n.idStavke === idStavke)
    this.stavkeNarudjbenice.splice(foundIndex, 1);
    localStorage.removeItem('stavka');
    localStorage.setItem('stavke', JSON.stringify(this.stavkeNarudjbenice));
    this.stavke.reset();
  }

  onPotvrdi(){
      this.narudjbenicaService.updateNarudjbenica(
      this.formaNarudjbenice.controls.idNarudjbenice.value,
      this.formaNarudjbenice.controls.datumKreiranja.value,
      this.formaNarudjbenice.controls.napomena.value,
      this.stavkeNarudjbenice
    )
    this.formaNarudjbenice.reset();
    this.stavkeNarudjbenice = [];
    localStorage.clear();
    this.stavke.reset();

  }

  onObrisi(id: string){
    this.narudjbenicaService.deleteNarudjbenica(id);
    this.formaNarudjbenice.reset();
    localStorage.clear();
    this.stavkeNarudjbenice =[];
    this.stavke.reset();
  }

  onOdustani(){
    this.formaNarudjbenice.reset();
    localStorage.clear();
    this.stavkeNarudjbenice =[];
    this.stavke.reset();

  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }

  getSavedValueIdNar(){
    if(!localStorage.getItem('unesenId')){
      return ""
    }
    return localStorage.getItem('unesenId')
  }

  getSavedValueDatum(){
    if(!localStorage.getItem('unesenDatum')){
      return ""
    }
    return localStorage.getItem('unesenDatum')
  }

  getSavedValueStavke(){
    if(!localStorage.getItem('stavke')){
      return [];
    }
    return JSON.parse(localStorage.getItem('stavke')|| '');

  }

  getSavedValueNapomena(){
    if(!localStorage.getItem('unesenaNapomena')){
      return ""
    }
    return localStorage.getItem('unesenaNapomena')
  }

  getSavedValueStavka(){
    if(!localStorage.getItem('stavka')){
      return [];
    }
    return JSON.parse(localStorage.getItem('stavka')|| '');
  }

  getSavedValueIndex(){
    if(!localStorage.getItem('izabraniIndex')){
      return "";
    }
    return localStorage.getItem('izabraniIndex')
  }




}

