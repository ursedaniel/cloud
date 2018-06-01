import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import {routing} from "./routes/routes";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MapComponent]
})
export class MapModule { }
