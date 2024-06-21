import { Component, LOCALE_ID, OnDestroy, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LANGUAGE } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  langulageControl!: FormControl;
  langulageControlSub!: Subscription;
  languages: LANGUAGE[] = [];

  public readonly localeId = inject(LOCALE_ID);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.languages = [];
    Object.values(LANGUAGE).forEach((value) => {
      this.languages.push(value);
    });
    // this.langulageControl = new FormControl<LANGUAGE>(<LANGUAGE>this.localeId, [Validators.required]);

    // this.langulageControlSub = this.langulageControl.valueChanges.subscribe((value: LANGUAGE) => {
    //   this.router.navigate(['/', value]);
    // });
  }

  ngOnDestroy(): void {
    // this.langulageControlSub.unsubscribe();
  }
}
