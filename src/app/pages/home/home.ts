import { Component, inject } from '@angular/core';
import { CsvParser } from '../../services/csv-parser';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private csvParser = inject(CsvParser);
  movies: Movie[] = [];

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];
      try{
        const movieList: Movie[] = await this.csvParser.parse(file);
        console.log('Filmes importados com sucesso:', movieList);
        this.movies = movieList;
      } catch(error){
        console.error('Erro ao processar arquivo csv: ', error);
      }
    }
  }
}
