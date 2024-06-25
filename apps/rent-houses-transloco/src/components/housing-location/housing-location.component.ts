import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { HousingLocation } from '../../models';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoDirective
  ],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.scss'],
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
