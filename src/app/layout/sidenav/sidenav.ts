import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidenav.scss',
})
export class Sidenav {

}
