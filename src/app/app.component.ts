import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { ScryfallService } from './core/services/scryfall.service';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
import languages from './core/costants/languages';
import { CardElementComponent } from "./shared/components/card-element/card-element.component";
import { MtgCard } from './core/models/mtg-cards.model';
import { MtgSet } from './core/models/mtg-sets.model';
import { MatDialog } from '@angular/material/dialog';
import { CardListDialogComponent } from './shared/components/card-list-dialog/card-list-dialog.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, HeaderComponent, SpinnerComponent, CardElementComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(protected scryfallService: ScryfallService, public dialog: MatDialog) { }
  sets$: Observable<MtgSet[]> = new Observable<MtgSet[]>();
  selectedSet = new FormControl<string>('');
  setCards: MtgCard[] = [];
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
    //console.log(this.setCards.filter(card => card.selected).map(card => `${card.name} - ${card.collector_number}/${this.setCards.length}`));
    const selectedCards = this.setCards.filter(card => card.selected).map(card => `${card.name} - ${card.collector_number}/${this.setCards.length}`).join('\n');

    console.log('carte selezionate: ', selectedCards);
    this.dialog.open(CardListDialogComponent, {
      height: '800px',
      width: '600px',
      data: selectedCards
    });
  }

  selectDeselectCard(event: MtgCard, index: number) {
    console.log(event, index);
    this.setCards[index].selected = !event.selected;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}