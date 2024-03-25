import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { MtgSet, MtgSetResponse } from '../models/mtg-sets.model';
import { MtgCard } from '../models/mtg-cards.model';
import { CardResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScryfallService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com/'
  constructor(private httpService: HttpClient) { }

  public isLoading = new BehaviorSubject<boolean>(false);


  getAllSets(): Observable<MtgSet[]> {
    this.isLoading.next(true);
    return this.httpService.get<MtgSetResponse>(this.scryfallApiUrl + 'sets').pipe(
      map(res => res.data),
      tap(_ => this.isLoading.next(false))
    );
  }

  async getAllCardsBySetCode(setCode: string, langCode?: string): Promise<MtgCard[]> {
    let setCards: MtgCard[] = [];
    const queryParameters: string = `q=b%3A${setCode}+order%3Aset+direction%3Aasc&unique=cards&as=grid&order=name`;
    let url: string = 'https://api.scryfall.com/cards/search?' + queryParameters;

    let hasMore: boolean = true;
    let res: CardResponse;

    this.isLoading.next(true);
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
    this.isLoading.next(false);
    return setCards;
  }
}
