import { Component, inject } from '@angular/core';
import { State } from '../../services/state';

@Component({
  imports: [],
  selector: 'app-directors',
  styleUrl: './directors.scss',
  templateUrl: './directors.html',
})
export class Directors {
  readonly stateService = inject(State);

  get top4() {
    return this.stateService.stats_data()?.directors.slice(0, 4) ?? [];
  }

  get rest() {
    return this.stateService.stats_data()?.directors.slice(4, 20) ?? [];
  }
}
