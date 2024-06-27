import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { HousingService } from '../../services';
import { HousingLocation } from '../../models';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
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
    email: new FormControl(''),
  });

  housingService: HousingService = inject(HousingService);
  private readonly titleService = inject(Title);
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.langSub = this.translateService
      .stream('home-details-title')
      .subscribe((value: string) => this.titleService.setTitle(value));

    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation$ =
      this.housingService.getHousingLocationById(housingLocationId);
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
