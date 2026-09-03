import { Component, inject, signal } from '@angular/core';
import { CsvParser } from '../../services/csv-parser';
import { Movie } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb';
import { from, concatMap, delay } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private csvParser = inject(CsvParser);
  private tmdbService = inject(TmdbService);
  movies = signal<Movie[]>([]);

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];

      try{
        const movieList: Movie[] = await this.csvParser.parse(file);
        console.log('Filmes importados com sucesso:', movieList);
        this.movies.set(movieList);
      } catch(error){
        console.error('Erro ao processar arquivo csv: ', error);
      }
    }
  }

  enrichMovies(): void {    
    from(this.movies()).pipe(
      concatMap(movie => this.tmdbService.enrichMovie(movie).pipe(delay(250)))
    ).subscribe({
      next: (enrichedMovie: Movie) => {
        console.log('Filme enriquecido:', enrichedMovie);
        this.movies.update(movies => movies.map(item => item.letterboxd_URL === enrichedMovie.letterboxd_URL ? {...item, ...enrichedMovie} : item));
      },
      error: (err) => console.error(err)
    });
  }
}
