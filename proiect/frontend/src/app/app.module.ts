import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {routing} from "./routes";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./routes/auth/auth.module";
import {FormsModule} from "@angular/forms";
import {ArticleModule} from "./routes/article/article.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    routing,
    RouterModule,
    AuthModule,
    ArticleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
