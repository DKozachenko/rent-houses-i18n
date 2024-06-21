import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LANGUAGE } from '../../models';

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
  languages: LANGUAGE[] = [];

  public readonly localeId = inject(LOCALE_ID);
  ngOnInit(): void {
    this.languages = [];
    Object.values(LANGUAGE).forEach((value) => {
      this.languages.push(value);
    });
  }
}
