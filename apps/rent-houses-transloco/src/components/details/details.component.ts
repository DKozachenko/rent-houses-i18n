import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Title } from '@angular/platform-browser';
import { HousingService } from '../../services';
import { HousingLocation } from '../../models';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoDirective
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private langSub!: Subscription;

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation$!: Observable<HousingLocation | undefined>;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  housingService = inject(HousingService);
  private readonly titleService = inject(Title);
  private readonly translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.langSub = this.translocoService
      .selectTranslate('home-details-title')
      .subscribe((value: string) => this.titleService.setTitle(value));

    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation$ = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
