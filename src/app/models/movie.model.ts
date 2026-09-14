export interface Movie extends Partial<TmdbMovieDetails>{
  title: string;
  release_year: number;

  last_rating: number; // converter para inteiro na hora que ler do csv e dividir por 10 depois para exibir na pagina;
  entries: WatchEntry[];
}
// Partial<T> permite que os novos campos (de TmdbMovieDetails) sejam todos opcionais. Isso é perfeito pois nao teremos aqueles dados incialmente;

export interface WatchEntry {
  watched_date: Date;
  rating: number;
  rewatch: boolean;
  letterboxd_URL: string;
}

export interface RatingPoint { // especifico para o grafico de pontos
  movie_title: string
  rating: number
  watched_date: Date
}

export interface TmdbSearchResponse {
  results: TmdbMovie[];
}

export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
}

export interface TmdbMovieDetails {
  id: number;
  genres: { id: number; name: string }[];
  origin_country: string[];
  production_countries: { iso_3166_1: string; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string; profile_path: string | null}[];
  };
}

export interface StatItem {
  term: string;
  count: number;
}

export interface PersonStatItem extends StatItem {
  profilePath: string;
}

export interface StatsList {
  genres: StatItem[];
  countries: StatItem[];
  cast: PersonStatItem[];
  directors: PersonStatItem[];
}