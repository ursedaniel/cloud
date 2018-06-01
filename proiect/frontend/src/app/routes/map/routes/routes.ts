import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MapComponent} from "../components/map/map.component";
/**
 * Created by Daniel on 26.09.2017.
 */
const routes: Routes = [
  {path: '', component: MapComponent},
  // {path: ':id', component: PageauthorityComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
