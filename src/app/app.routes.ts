import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Genres } from './pages/genres/genres';
import { Directors } from './pages/directors/directors';
import { Countries } from './pages/countries/countries';
import { Cast } from './pages/cast/cast';

export const routes: Routes = [
  {path: 'home', component: Home},

  {path: 'genres', component: Genres},

  {path: 'directors', component: Directors},

  {path: 'countries', component: Countries},

  {path: 'cast', component: Cast},
  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
