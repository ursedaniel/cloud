
import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MapComponent} from "./routes/map/components/map/map.component";
import {AuthComponent} from "./routes/auth/components/auth/auth.component";
import {ArticleComponent} from "./routes/article/components/article/article.component";
import {AccountComponent} from "./routes/account/components/account/account.component";

export const routes = [

  {path: '', component: MapComponent},
  {path: 'map', component: MapComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'account', component: AccountComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'article/:id', component: ArticleComponent},
  // Not lazy-loaded routes
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // {path: 'recover', component: RecoverComponent},
  // {path: 'lock', component: LockComponent},
  // {path: 'maintenance', component: MaintenanceComponent},
  // {path: '404', component: Error404Component},
  // {path: '500', component: Error500Component},

  // Not found
  {path: '**', component: MapComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
