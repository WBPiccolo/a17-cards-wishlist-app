import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, filter, firstValueFrom, map, takeUntil } from 'rxjs';
import { Set, Card } from './core/models'
import { ScryfallService } from './core/services/scryfall.service';
import { HeaderComponent } from "./shared/components/header/header.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, HeaderComponent]
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpClient, private scryfallService: ScryfallService) { }
  sets$: Observable<Set[]> = new Observable<Set[]>();
  selectedSet = new FormControl<string>('');
  setCards: Card[] = [];

  ngOnInit(): void {
    this.sets$ = this.scryfallService.getAllSets();
  }

  loadCardsFromSet(data: any) {
    console.log('loadCardFromSet', data);
  }
  // async getAllCardsBySetCode(setCode: string) {
  //   const queryParameters: string = `q=b%3A${setCode}+order%3Aset+direction%3Aasc&unique=cards&as=grid&order=name`;
  //   this.setCards = [];
  //   let hasMore: boolean = true;
  //   let url: string = 'https://api.scryfall.com/cards/search?' + queryParameters;
  //   let res: CardResponse;
  //   while (hasMore) {
  //     //100 ms between requests
  //     res = await firstValueFrom(this.httpService.get<CardResponse>(url));
  //     this.setCards.push(...res.data);
  //     hasMore = res.has_more;
  //     if (hasMore) {
  //       url = res.next_page;
  //     }
  //     setTimeout(() => { }, 100);
  //   }
  // }
}