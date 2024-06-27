import { Injectable, OnDestroy, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, map, concat, defer } from 'rxjs';
import { HousingLocation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HousingService implements OnDestroy {
  private langSub!: Subscription;
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  private readonly translateService = inject(TranslateService);
  // Need defer for dynamic `this.translateService.currentLang`
  private readonly currentTranslations$ = defer(() =>
    concat(
      this.translateService.getTranslation(this.translateService.currentLang),
      this.translateService.onLangChange.asObservable()
    ).pipe(
      map((data: object | LangChangeEvent) => {
        if (!data.hasOwnProperty('lang')) {
          return {
            lang: this.translateService.currentLang,
            translations: data,
          };
        }

        return <LangChangeEvent>data;
      })
    )
  );

  housingLocationList$: Observable<HousingLocation[]> =
    this.currentTranslations$.pipe(
      map(({ translations }) => {
        return [
          {
            id: 0,
            name: translations['housing-location-0-name'],
            city: translations['housing-location-0-city'],
            state: translations['housing-location-0-state'],
            photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
            availableUnits: 4,
            wifi: true,
            laundry: true,
          },
          {
            id: 1,
            name: translations['housing-location-1-name'],
            city: translations['housing-location-1-city'],
            state: translations['housing-location-1-state'],
            photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
            availableUnits: 0,
            wifi: false,
            laundry: true,
          },
          {
            id: 2,
            name: translations['housing-location-2-name'],
            city: translations['housing-location-2-city'],
            state: translations['housing-location-2-state'],
            photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
            availableUnits: 1,
            wifi: false,
            laundry: false,
          },
          {
            id: 3,
            name: translations['housing-location-3-name'],
            city: translations['housing-location-3-city'],
            state: translations['housing-location-3-state'],
            photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
            availableUnits: 1,
            wifi: true,
            laundry: false,
          },
          {
            id: 4,
            name: translations['housing-location-4-name'],
            city: translations['housing-location-4-city'],
            state: translations['housing-location-4-state'],
            photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
            availableUnits: 1,
            wifi: true,
            laundry: false,
          },
          {
            id: 5,
            name: translations['housing-location-5-name'],
            city: translations['housing-location-5-city'],
            state: translations['housing-location-5-state'],
            photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
            availableUnits: 2,
            wifi: true,
            laundry: true,
          },
          {
            id: 6,
            name: translations['housing-location-6-name'],
            city: translations['housing-location-6-city'],
            state: translations['housing-location-6-state'],
            photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
            availableUnits: 5,
            wifi: true,
            laundry: true,
          },
          {
            id: 7,
            name: translations['housing-location-7-name'],
            city: translations['housing-location-7-city'],
            state: translations['housing-location-7-state'],
            photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
            availableUnits: 2,
            wifi: true,
            laundry: true,
          },
          {
            id: 8,
            name: translations['housing-location-8-name'],
            city: translations['housing-location-8-city'],
            state: translations['housing-location-8-state'],
            photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
            availableUnits: 10,
            wifi: false,
            laundry: false,
          },
          {
            id: 9,
            name: translations['housing-location-9-name'],
            city: translations['housing-location-9-city'],
            state: translations['housing-location-9-state'],
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
      this.translateService.instant('submit-application-log', {
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
