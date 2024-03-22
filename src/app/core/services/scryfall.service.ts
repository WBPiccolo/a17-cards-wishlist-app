import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetResponse } from '../models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScryfallService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com/'
  constructor(private httpService: HttpClient) { }

  getAllSets() {
    return this.httpService.get<SetResponse>(this.scryfallApiUrl + 'sets').pipe(
      map(res => res.data)
    );
  }

    // this.sets$ = this.httpService.get<SetResponse>('https://api.scryfall.com/sets').pipe(
    //   map(res => res.data)
    // );

}
