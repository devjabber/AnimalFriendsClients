import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgGridModule } from 'ag-grid-angular';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailsComponent,
    NavbarComponent,
    NotFoundComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
