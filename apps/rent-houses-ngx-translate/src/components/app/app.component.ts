import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private langSub!: Subscription;
  languages: string[] = [];
  languageControl!: FormControl<string | null>;

  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.languages = this.translateService.getLangs();

    const activeLang = this.translateService.currentLang;
    console.log(activeLang);
    this.languageControl = new FormControl<string>(activeLang, [Validators.required]);
    this.langSub = this.languageControl.valueChanges.subscribe((value: string | null) => {
      if (!value) {
        return;
      }

      this.document.documentElement.lang = value;
      this.translateService.use(value);
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
