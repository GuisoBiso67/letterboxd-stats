import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})

export class CsvParser {
  parse(file: File): Promise<Movie[]>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const conteudo = event.target?.result as string;
        const linhas = conteudo.split('\n').slice(1);
        const filmes: Movie[] = [];
        
        for (const linha of linhas) {
          const colunas = linha.split(',');
          
          const filme: Movie = {
            title: colunas[1],
            release_year: Number(colunas[2]),
            log_date: new Date(colunas[0]), // assim ele retorna um objeto data;
            rating: Number(colunas[4])*10,
            letterboxd_URL: colunas[3]
          }
          filmes.push(filme);
        }
        resolve(filmes);
      };
      reader.onerror = () => reject('Erro ao ler o arquivo');
      reader.readAsText(file);
    });
  }
}
