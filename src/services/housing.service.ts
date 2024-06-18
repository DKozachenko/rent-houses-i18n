import { Injectable } from '@angular/core';
import { HousingLocation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  protected housingLocationList: HousingLocation[] = [
    {
      id: 0,
      name: $localize `:@@housing-location-0-name:Acme Fresh Start Housing`,
      city: $localize `:@@housing-location-0-city:Chicago`,
      state: $localize `:@@housing-location-0-state:IL`,
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true
    },
    {
      id: 1,
      name: $localize `:@@housing-location-1-name:A113 Transitional Housing`,
      city: $localize `:@@housing-location-1-city:Santa Monica`,
      state: $localize `:@@housing-location-1-state:CA`,
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true
    },
    {
      id: 2,
      name: $localize `:@@housing-location-2-name:Warm Beds Housing Support`,
      city: $localize `:@@housing-location-2-city:Juneau`,
      state: $localize `:@@housing-location-2-state:AK`,
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false
    },
    {
      id: 3,
      name: $localize `:@@housing-location-3-name:Homesteady Housing`,
      city: $localize `:@@housing-location-3-city:Chicago`,
      state: $localize `:@@housing-location-3-state:IL`,
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 4,
      name: $localize `:@@housing-location-4-name:Happy Homes Group`,
      city: $localize `:@@housing-location-4-city:Gary`,
      state: $localize `:@@housing-location-4-state:IN`,
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 5,
      name: $localize `:@@housing-location-5-name:Hopeful Apartment Group`,
      city: $localize `:@@housing-location-5-city:Oakland`,
      state: $localize `:@@housing-location-5-state:CA`,
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 6,
      name: $localize `:@@housing-location-6-name:Seriously Safe Towns`,
      city: $localize `:@@housing-location-6-city:Oakland`,
      state: $localize `:@@housing-location-6-state:CA`,
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true
    },
    {
      id: 7,
      name: $localize `:@@housing-location-7-name:Hopeful Housing Solutions`,
      city: $localize `:@@housing-location-7-city:Oakland`,
      state: $localize `:@@housing-location-7-state:CA`,
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 8,
      name: $localize `:@@housing-location-8-name:Seriously Safe Towns`,
      city: $localize `:@@housing-location-8-city:Oakland`,
      state: $localize `:@@housing-location-8-state:CA`,
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false
    },
    {
      id: 9,
      name: $localize `:@@housing-location-9-name:Capital Safe Towns`,
      city: $localize `:@@housing-location-9-city:Portland`,
      state: $localize `:@@housing-location-9-state:OR`,
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
      wifi: true,
      laundry: true
    }
  ];

  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log($localize `:@@submit-application-log:Homes application received: firstName: ${firstName}:firstName:, lastName: ${lastName}:lastName:, email: ${email}:email:.`);
  }
}
