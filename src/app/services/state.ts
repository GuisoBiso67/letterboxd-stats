import { signal, Injectable } from '@angular/core';
import { Movie, StatsList } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class State {
  movies = signal<Movie[]>([]);
  stats_data = signal<StatsList | null>(null);
}
