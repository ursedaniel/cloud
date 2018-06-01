import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {routing} from "./routes/routes";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    routing,
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  providers: []
})
export class AuthModule { }
