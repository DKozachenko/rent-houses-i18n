import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

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
export class AppComponent implements OnInit {
  languageControl!: FormControl<string | null>;

  private translocoService = inject(TranslocoService);

  ngOnInit(): void {
    const activeLang = this.translocoService.getActiveLang();
    this.languageControl = new FormControl<string>(activeLang, [Validators.required]);
    this.languageControl.valueChanges.subscribe((value: string | null) => {
      if (!value) {
        return;
      }

      this.translocoService.setActiveLang(value);
    });
  }
}
