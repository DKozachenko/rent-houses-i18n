import { Injectable, OnDestroy, inject } from '@angular/core';
import { Translation, TranslocoService } from '@jsverse/transloco';
import { HousingLocation } from '../models';
import { Observable, Subscription, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService implements OnDestroy {
  private langSub!: Subscription;
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  private readonly translocoService = inject(TranslocoService);

  housingLocationList$: Observable<HousingLocation[]> = this.translocoService
    .selectTranslation()
    .pipe(
      map((data: Translation) => {
        return [
          {
            id: 0,
            name: data['housing-location-0-name'],
            city: data['housing-location-0-city'],
            state: data['housing-location-0-state'],
            photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
            availableUnits: 4,
            wifi: true,
            laundry: true,
          },
          {
            id: 1,
            name: data['housing-location-1-name'],
            city: data['housing-location-1-city'],
            state: data['housing-location-1-state'],
            photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
            availableUnits: 0,
            wifi: false,
            laundry: true,
          },
          {
            id: 2,
            name: data['housing-location-2-name'],
            city: data['housing-location-2-city'],
            state: data['housing-location-2-state'],
            photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
            availableUnits: 1,
            wifi: false,
            laundry: false,
          },
          {
            id: 3,
            name: data['housing-location-3-name'],
            city: data['housing-location-3-city'],
            state: data['housing-location-3-state'],
            photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
            availableUnits: 1,
            wifi: true,
            laundry: false,
          },
          {
            id: 4,
            name: data['housing-location-4-name'],
            city: data['housing-location-4-city'],
            state: data['housing-location-4-state'],
            photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
            availableUnits: 1,
            wifi: true,
            laundry: false,
          },
          {
            id: 5,
            name: data['housing-location-5-name'],
            city: data['housing-location-5-city'],
            state: data['housing-location-5-state'],
            photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
            availableUnits: 2,
            wifi: true,
            laundry: true,
          },
          {
            id: 6,
            name: data['housing-location-6-name'],
            city: data['housing-location-6-city'],
            state: data['housing-location-6-state'],
            photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
            availableUnits: 5,
            wifi: true,
            laundry: true,
          },
          {
            id: 7,
            name: data['housing-location-7-name'],
            city: data['housing-location-7-city'],
            state: data['housing-location-7-state'],
            photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
            availableUnits: 2,
            wifi: true,
            laundry: true,
          },
          {
            id: 8,
            name: data['housing-location-8-name'],
            city: data['housing-location-8-city'],
            state: data['housing-location-8-state'],
            photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
            availableUnits: 10,
            wifi: false,
            laundry: false,
          },
          {
            id: 9,
            name: data['housing-location-9-name'],
            city: data['housing-location-9-city'],
            state: data['housing-location-9-state'],
            photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
            availableUnits: 6,
            wifi: true,
            laundry: true,
          },
        ];
      })
    );

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.housingLocationList$.pipe(
      map((list) => list.find((housingLocation) => housingLocation.id === id))
    );
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      this.translocoService.translate('submit-application-log', {
        firstName,
        lastName,
        email,
      })
    );
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
