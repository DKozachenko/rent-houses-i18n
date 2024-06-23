import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Title } from '@angular/platform-browser';
import { Subscription, filter } from 'rxjs';
import { HousingLocation } from '../../models';
import { HousingService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, TranslocoDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private langSub!: Subscription;

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  private readonly titleService = inject(Title);
  private readonly translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.langSub = this.translocoService
      .selectTranslate('home-page-title')
      .subscribe((value: string) => this.titleService.setTitle(value));

    const eventSub = this.translocoService.events$
      .pipe(filter((e) => e.type === 'translationLoadSuccess'))
      .subscribe(() => {
        this.housingLocationList = this.housingService.getAllHousingLocations();
        this.filteredLocationList = this.housingLocationList;
      });
    this.langSub.add(eventSub);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
