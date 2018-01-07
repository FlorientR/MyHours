import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HoursInputComponent } from './hours-input/hours-input.component';
import { HoursListComponent } from './hours-list/hours-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HoursInputComponent,
    HoursListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
