import { TestBed } from '@angular/core/testing';

import { CsvParser } from './csv-parser';

describe('CsvParser', () => {
  let service: CsvParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvParser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve parsear corretamente uma linha do CSV', async () => {
    // Simula exatamente a estrutura do seu CSV (Date, Name, Year, Letterboxd URI, Rating)
    const csvFake = "Date,Name,Year,Letterboxd URI,Rating\n8/10/2021,The Suicide Squad,2021,https://boxd.it/fw6O,4";
    
    const blob = new Blob([csvFake], { type: 'text/csv' });
    const file = new File([blob], 'test.csv', { type: 'text/csv' });
    
    const resultado = await service.parse(file);
    
    expect(resultado.length).toBe(1);
    expect(resultado[0].log_date.getFullYear()).toBe(2021);
    expect(resultado[0].title).toBe('The Suicide Squad');
    expect(resultado[0].release_year).toBe(2021);
    expect(resultado[0].rating).toBe(40); // 4 * 10
    expect(resultado[0].letterboxd_URL).toBe('https://boxd.it/fw6O');
  });

});
