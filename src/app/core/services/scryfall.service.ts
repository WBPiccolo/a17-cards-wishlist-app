import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { MtgSet, MtgSetResponse } from '../models/mtg-sets.model';
import { MtgCard } from '../models/mtg-cards.model';
import { CardResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScryfallService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com/'
  constructor(private httpService: HttpClient) { }

  showSpinner: boolean = false;

  getAllSets(): Observable<MtgSet[]> {
    this.showSpinner = true;
    return this.httpService.get<MtgSetResponse>(this.scryfallApiUrl + 'sets').pipe(
      map(res => res.data),
      tap(_ => this.showSpinner = false)
    );
  }

  async getAllCardsBySetCode(setCode: string, langCode?: string): Promise<MtgCard[]> {
    this.showSpinner = true;
    let setCards: MtgCard[] = [];
    const queryParameters: string = `q=b%3A${setCode}+order%3Aset+direction%3Aasc&unique=cards&as=grid&order=name`;
    let url: string = 'https://api.scryfall.com/cards/search?' + queryParameters;

    let hasMore: boolean = true;
    let res: CardResponse;

    while (hasMore) {
      res = await firstValueFrom(this.httpService.get<CardResponse>(url));
      if (!res?.data) {
        break;
      }
      setCards.push(...res.data);
      hasMore = res.has_more;
      if (hasMore) {
        url = res.next_page;
      }
      setTimeout(() => { }, 100);
    }
    this.showSpinner = false;
    return setCards;
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

  // this.sets$ = this.httpService.get<SetResponse>('https://api.scryfall.com/sets').pipe(
  //   map(res => res.data)
  // );

}
