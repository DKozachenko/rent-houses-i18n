import { Observable, map } from 'rxjs';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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

  housingLocationList$!: Observable<HousingLocation[]>;
  filteredLocationList$!: Observable<HousingLocation[]>;

  housingService: HousingService = inject(HousingService);
  private readonly titleService = inject(Title);
  private readonly translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.langSub = this.translocoService
      .selectTranslate('home-page-title')
      .subscribe((value: string) => this.titleService.setTitle(value));

    this.housingLocationList$ = this.housingService.housingLocationList$;
    this.filteredLocationList$ = this.housingService.housingLocationList$;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList$ = this.housingLocationList$;
      return;
    }

    this.filteredLocationList$ = this.housingLocationList$.pipe(
      map((list) =>
        list.filter((housingLocation) =>
          housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
