import { Injectable } from '@angular/core';
import { Movie, WatchEntry } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})

export class CsvParser {
  parse(file: File): Promise<Movie[]>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const lines = content.split('\n').slice(1).filter(line => line.trim() !== '');

        const moviesMap: Record<string, Movie> = {}; // cria um "dicinario" para facilitar buscas usando title+year;
        
        for (const line of lines) {
          const columns = line.split(',');

          const key = `${columns[1]}-${columns[2]}`; // verificar repetições depois, melhorar isso aqui;

          const entry: WatchEntry = {
            watched_date: new Date(columns[7]),
            rating: Number(columns[4])*10,
            rewatch: columns[5] === "Yes" ? true : false,
            letterboxd_URL: columns[3]
          }

          if(moviesMap[key]){
            moviesMap[key].entries.push(entry);
            moviesMap[key].last_rating = entry.rating; // sobrescreve ultima nota;
          }else{
            moviesMap[key] = {
              title: columns[1],
              release_year: Number(columns[2]),
              last_rating: entry.rating, // qual valor aqui?
              entries: [entry] // array com só essa entry por enquanto
            };
          }
        }
        resolve(Object.values(moviesMap));
      };
      reader.onerror = () => reject('Error reading the file.');
      reader.readAsText(file);
    });
  }
}
