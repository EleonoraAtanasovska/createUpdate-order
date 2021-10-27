import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SastavljanjeNarudjbeniceComponent } from './sastavljanje-narudjbenice/sastavljanje-narudjbenice.component';
import { IzborProizvodaComponent } from './sastavljanje-narudjbenice/izbor-proizvoda/izbor-proizvoda.component';
import { IzmenaBrisanjeComponent } from './izmena-brisanje/izmena-brisanje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { SearchfilterPipe } from './searchfilter.pipe';
import { ProizvodService } from './proizvod.service';
import { NarudjbenicaService } from './narudjbenica.service';
import { StavkaNarudjbeniceService } from './stavka-narudjbenice.service';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import {  MatButtonModule } from "@angular/material/button"
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SastavljanjeNarudjbeniceComponent,
    IzborProizvodaComponent,
    IzmenaBrisanjeComponent,
    SearchfilterPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [ProizvodService, NarudjbenicaService, StavkaNarudjbeniceService,
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
