import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HoursInputComponent } from './hours-input/hours-input.component';
import {SessionService} from './session.service';
import {CookieService} from 'ngx-cookie-service';
import { FormatMinutesPipe } from './format-minutes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HoursInputComponent,
    FormatMinutesPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SessionService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
