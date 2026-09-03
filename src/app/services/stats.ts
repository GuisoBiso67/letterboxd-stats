import { Injectable } from '@angular/core';
import { Movie, StatItem, StatsList } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class Stats {
  compute(movies: Movie[]): StatsList{
    const statsList = {} as StatsList

    const genreCount: Record<string, number> = {};
    const countryCount: Record<string, number> = {};
    const castCount: Record<string, number> = {};
    const directorCount: Record<string, number> = {};

    for (const movie of movies) {
      for (const genre of movie.genres ?? []) {
        genreCount[genre.name] = (genreCount[genre.name] ?? 0) + 1;
      }

      for (const country of movie.production_countries ?? []){
        countryCount[country.name] = (countryCount[country.name] ?? 0) + 1;
      }

      for (const cast of movie.credits?.cast ?? []){
        castCount[cast.name] = (castCount[cast.name] ?? 0) + 1;
      }

      for (const director of movie.credits?.crew ?? []){
        if(director.job === "Director"){
          directorCount[director.name] = (directorCount[director.name] ?? 0) + 1;
        }
      }
    }

    const entriesGenre: StatItem[] = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1]) // Ordena do maior pro menor;
      .map(([term, count]) => ({
        term,
        count
      }));
    const entriesCountries: StatItem[] = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1]) // Ordena do maior pro menor;
      .map(([term, count]) => ({
        term,
        count
      }));
    const entriesCast: StatItem[] = Object.entries(castCount)
      .sort((a, b) => b[1] - a[1]) // Ordena do maior pro menor;
      .map(([term, count]) => ({
        term,
        count
      }));
    const entriesDirectors: StatItem[] = Object.entries(directorCount)
      .sort((a, b) => b[1] - a[1]) // Ordena do maior pro menor;
      .map(([term, count]) => ({
        term,
        count
      }));

    statsList.genres = entriesGenre;
    statsList.countries = entriesCountries;
    statsList.cast = entriesCast;
    statsList.directors = entriesDirectors;
    console.log(entriesGenre);

    return statsList;
  }
}
