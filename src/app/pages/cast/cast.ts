import { Component, inject } from '@angular/core';
import { State } from '../../services/state';

@Component({
  imports: [],
  selector: 'app-cast',
  styleUrl: './cast.scss',
  templateUrl: './cast.html',
})
export class Cast {
  readonly stateService = inject(State);

  get top4() {
    return this.stateService.stats_data()?.cast.slice(0, 4) ?? [];
  }

  get rest() {
    return this.stateService.stats_data()?.cast.slice(4, 20) ?? [];
  }
}
