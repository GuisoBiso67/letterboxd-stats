import { Injectable } from '@angular/core';
import { Movie, StatItem, StatsList, PersonStatItem } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class Stats {

  // corrige divergencia entre o "Intl" e o src/assets/world.json
  // fonte mapa: https://geojson-maps.kyd.au/
  
  private readonly geoNameFix: Record<string, string> = {
    'United States': 'United States of America',
    'Dominican Republic': 'Dominican Rep.',
    'Equatorial Guinea': 'Eq. Guinea',
    'Solomon Islands': 'Solomon Is.',
    'Bosnia & Herzegovina': 'Bosnia and Herz.',
    'Central African Republic': 'Central African Rep.',
    'Congo - Kinshasa': 'Dem. Rep. Congo',
    'Congo - Brazzaville': 'Congo',
    'South Sudan': 'S. Sudan',
    'Western Sahara': 'W. Sahara',
    'Czechia': 'Czech Rep.'
  };

  compute(movies: Movie[]): StatsList{
    const statsList = {} as StatsList;

    const genreCount: Record<string, number> = {};
    const countryCount: Record<string, number> = {};
    const castCount: Record<string, PersonStatItem> = {};
    const directorCount: Record<string, PersonStatItem> = {};

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    for (const movie of movies) {
      for (const genre of movie.genres ?? []) {
        genreCount[genre.name] = (genreCount[genre.name] ?? 0) + 1;
      }

      for (const code of movie.origin_country ?? []) {
        const countryName = regionNames.of(code) || code;
        const geoName = this.geoNameFix[countryName] ?? countryName;
        countryCount[geoName] = (countryCount[geoName] ?? 0) + 1;
      }

      for (const cast of movie.credits?.cast ?? []){
        if(castCount[cast.name]){
          castCount[cast.name].count += 1
        }else{
          castCount[cast.name] = {
              term: cast.name,
              count: 1,
              profilePath: cast.profile_path
                ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                : ''
            };
        }
      }

      for (const director of movie.credits?.crew ?? []){
        if(director.job === "Director"){
          if (directorCount[director.name]) {
            directorCount[director.name].count += 1;
          } else {
            directorCount[director.name] = {
              term: director.name,
              count: 1,
              profilePath: director.profile_path 
                ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                : ''
            };
          }
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
    const entriesCast: PersonStatItem[] = Object.entries(castCount)
      .sort(([, aItem], [, bItem]) => bItem.count - aItem.count) // Maior para o menor
      .map(([, personStatItem]) => (personStatItem
      ));
    const entriesDirectors: PersonStatItem[] = Object.entries(directorCount)
      .sort(([, aItem], [, bItem]) => bItem.count - aItem.count) // Maior para o menor
      .map(([, personStatItem]) => (personStatItem
      ));

    statsList.genres = entriesGenre;
    statsList.countries = entriesCountries;
    statsList.cast = entriesCast;
    statsList.directors = entriesDirectors;
    console.log(entriesGenre);

    return statsList;
  }
}
