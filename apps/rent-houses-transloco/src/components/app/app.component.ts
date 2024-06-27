import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
  private langSub!: Subscription;
  languages: string[] = [];
  languageControl!: FormControl<string | null>;

  private readonly translocoService = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.languages = <string[]>this.translocoService.getAvailableLangs();

    const activeLang = this.translocoService.getActiveLang();
    this.languageControl = new FormControl<string>(activeLang, [Validators.required]);
    this.langSub = this.languageControl.valueChanges.subscribe((value: string | null) => {
      if (!value) {
        return;
      }

      this.document.documentElement.lang = value;
      this.translocoService.setActiveLang(value);
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
