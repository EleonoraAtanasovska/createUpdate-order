import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IzmenaBrisanjeComponent } from "./izmena-brisanje/izmena-brisanje.component";
import { IzborProizvodaComponent } from "./sastavljanje-narudjbenice/izbor-proizvoda/izbor-proizvoda.component";
import { SastavljanjeNarudjbeniceComponent } from "./sastavljanje-narudjbenice/sastavljanje-narudjbenice.component";

const routes: Routes = [
  { path: '', redirectTo: '/sastavljanje', pathMatch: 'full'  },
  { path : 'sastavljanje', component: SastavljanjeNarudjbeniceComponent},
  { path : 'sast/:idProizvoda', component: SastavljanjeNarudjbeniceComponent},
  { path: 'proizvod', component: IzborProizvodaComponent},
  { path: 'izmena', component: IzmenaBrisanjeComponent, children: [{
    path: ':idNarudjbenice', component:IzmenaBrisanjeComponent
  }]},
  { path: 'proizvod1/:idNar', component: IzborProizvodaComponent},
  { path: 'izmene/:idProizvod', component: IzmenaBrisanjeComponent},
  { path: 'izmene', redirectTo: '/izmena', pathMatch: 'full'},
  { path: 'sast', redirectTo: '/sastavljanje', pathMatch: 'full'}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
