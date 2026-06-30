export interface Movie{
title: string;
release_year: number;
log_date: Date;
rating: number; // converter para inteiro na hora que ler do csv e dividir por 10 depois para exibir na pagina;
letterboxd_URL: string;
}