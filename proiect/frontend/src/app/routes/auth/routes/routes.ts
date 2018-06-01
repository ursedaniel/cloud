import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthComponent} from "../components/auth/auth.component";
/**
 * Created by Daniel on 26.09.2017.
 */
const routes: Routes = [
  {path: '', component: AuthComponent},
  // {path: ':id', component: PageauthorityComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
