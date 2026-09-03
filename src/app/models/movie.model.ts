export interface Movie extends Partial<TmdbMovieDetails>{
  title: string;
  release_year: number;
  log_date: Date;
  rating: number; // converter para inteiro na hora que ler do csv e dividir por 10 depois para exibir na pagina;
  letterboxd_URL: string;
}
// Partial<T> permite que os novos campos (de TmdbMovieDetails) sejam todos opcionais. Isso é perfeito pois nao teremos aqueles dados incialmente;

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
  production_countries: { iso_3166_1: string; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  };
}

export interface StatItem {
  term: string;
  count: number;
}

export interface StatsList {
  genres: StatItem[];
  countries: StatItem[];
  cast: StatItem[];
  directors: StatItem[];
}