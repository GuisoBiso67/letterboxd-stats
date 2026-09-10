import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CsvParser } from '../../services/csv-parser';
import { Movie, StatsList } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb';
import { from, concatMap, delay } from 'rxjs';
import { Stats } from '../../services/stats';
import { Genres } from '../genres/genres';
import { State } from '../../services/state';

@Component({
  selector: 'app-home',
  imports: [Genres],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.scss',
})
export class Home {
  private csvParser = inject(CsvParser);
  private tmdbService = inject(TmdbService);
  private statsService = inject(Stats);
  readonly stateService = inject(State);

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];

      try{
        const movieList: Movie[] = await this.csvParser.parse(file);
        console.log('Successfully imported movies:', movieList);
        this.stateService.movies.set(movieList);
      } catch(error){
        console.error('Error processing csv file: ', error);
      }
    }
  }

  enrichMovies(): void {    
    from(this.stateService.movies()).pipe(
      concatMap(movie => this.tmdbService.enrichMovie(movie).pipe(delay(250)))
    ).subscribe({
      next: (enrichedMovie: Movie) => {
        console.log('Movie enriched:', enrichedMovie);
        // alterar isso após a chegado dos IDs únicos;
        this.stateService.movies.update(movies => movies.map(item => 
          item.title === enrichedMovie.title && item.release_year === enrichedMovie.release_year 
            ? {...item, ...enrichedMovie} 
            : item
        ));
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Enrichment completed successfully!');
        this.stateService.stats_data.set(this.statsService.compute(this.stateService.movies()));
        console.log('Stats: ', this.stateService.stats_data());
      }
    });
  }
}
