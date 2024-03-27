import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Set, Card } from './core/models';
import { ScryfallService } from './core/services/scryfall.service';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
import languages from './core/costants/languages';
import { CardElementComponent } from "./shared/components/card-element/card-element.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, HeaderComponent, SpinnerComponent, CardElementComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(protected scryfallService: ScryfallService) { }
  sets$: Observable<Set[]> = new Observable<Set[]>();
  selectedSet = new FormControl<string>('');
  setCards: Card[] = [];
  setLanguages = languages;
 
  headerForm = new FormGroup({
    set: new FormControl(),
    language: new FormControl(),
  });

  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    this.sets$ = this.scryfallService.getAllSets();

    this.headerForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(newVal => {
      console.log('headerForm newVal', newVal);
      if(newVal.set) {
        this.loadCardsFromSet(newVal.set.code, newVal.language)
      }
    })
  }

  async loadCardsFromSet(setCode: string, language?: string) {
    console.log('loadCardFromSet', setCode);
    this.setCards = [];
    this.setCards = await this.scryfallService.getAllCardsBySetCode(setCode, language || 'en');
  }

  selectAllCards(status: boolean) {
    console.log('selectAlLCards', event);

    this.setCards = this.setCards.map(card => ({...card, selected: status}));
  }

  openCardListModal() {
    console.log('openCardListModal');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}