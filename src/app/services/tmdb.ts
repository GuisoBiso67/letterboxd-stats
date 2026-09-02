import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, switchMap, map, throwError } from 'rxjs';
import { Movie, TmdbMovieDetails, TmdbSearchResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })

export class TmdbService {
  private http = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  searchMovie(title: string, year: number): Observable<TmdbSearchResponse> {
    const full_url = `${this.baseUrl}/search/movie`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', title)
      .set('primary_release_year', year)

    return this.http.get<TmdbSearchResponse>(full_url, { params });
  }

  getMovieDetails(id: number): Observable<TmdbMovieDetails>{
    const credits_url = `${this.baseUrl}/movie/${id}?append_to_response=credits`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)

    return this.http.get<TmdbMovieDetails>(credits_url, { params });
  }

  enrichMovie(movie: Movie): Observable<Movie> {
    return this.searchMovie(movie.title, movie.release_year).pipe(
      // switchMap transforma um valor emitido em um novo Observable e cancela automaticamente a requisição ou inscrição anterior se um novo valor chegar antes do término;
      switchMap(response => {
        if (!response.results.length) { // checa se array esta vazio;
          return throwError(() => new Error(`Movie was not found: ${movie.title}`));
        }
        const id = response.results[0].id;
        return this.getMovieDetails(id);        
      }),
      map(details => {
        return { ...movie, ...details };
      })
    );
  }
}