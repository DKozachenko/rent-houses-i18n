import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../models';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.scss'],
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
