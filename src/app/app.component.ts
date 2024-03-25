import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Set, Card } from './core/models';
import { ScryfallService } from './core/services/scryfall.service';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, HeaderComponent, SpinnerComponent]
})
export class AppComponent implements OnInit {
  constructor(protected scryfallService: ScryfallService) { }
  sets$: Observable<Set[]> = new Observable<Set[]>();
  selectedSet = new FormControl<string>('');
  setCards: Card[] = [];

  showSpinner: boolean = false;

  ngOnInit(): void {
    this.sets$ = this.scryfallService.getAllSets();
  }

  async loadCardsFromSet(setCode: string) {
    console.log('loadCardFromSet', setCode);
    this.setCards = [];
    this.setCards = await this.scryfallService.getAllCardsBySetCode(setCode);
  }
}