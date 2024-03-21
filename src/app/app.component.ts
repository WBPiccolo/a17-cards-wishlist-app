import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, filter, firstValueFrom, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpClient) { }
  sets$: Observable<Set[]> = new Observable<Set[]>();
  selectedSet = new FormControl<string>('');
  setCards: Card[] = [];

  ngOnInit(): void {
    this.sets$ = this.httpService.get<SetResponse>('https://api.scryfall.com/sets').pipe(
      map(res => res.data)
    );

    this.selectedSet.valueChanges.pipe(
      filter(newVal => !!newVal),
    ).subscribe(newVal => {
      console.log('selectedSetnewVal', newVal);
      this.getAllCardsBySetCode(newVal!);
    })
  }

  async getAllCardsBySetCode(setCode: string) {
    const queryParameters: string = `q=b%3A${setCode}+order%3Aset+direction%3Aasc&unique=cards&as=grid&order=name`;
    this.setCards = [];
    let hasMore: boolean = true;
    let url: string = 'https://api.scryfall.com/cards/search?' + queryParameters;
    let res: CardResponse;
    while (hasMore) {
      //100 ms between requests
      res = await firstValueFrom(this.httpService.get<CardResponse>(url));
      this.setCards.push(...res.data);
      hasMore = res.has_more;
      if (hasMore) {
        url = res.next_page;
      }
      setTimeout(() => { }, 100);
    }
  }
}

interface SetResponse {
  object: string,
  has_more: boolean,
  data: Set[]
}
interface Set {
  object: string,
  id: string,
  code: string,
  name: string,
  uri: string,
  scryfall_uri: string,
  search_uri: string,
  released_at: Date,
  set_type: string,
  card_count: number,
  printed_size: number,
  parent_set_code: string,
  digital: boolean,
  nonfoil_only: boolean,
  foil_only: boolean,
  icon_svg_uri: string
}

interface CardResponse {
  object: string,
  has_more: boolean,
  total_cards: number,
  next_page: string,
  data: Card[]
}
interface Card {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  mtgo_foil_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  power: string;
  toughness: string;
  colors: string[];
  color_identity: string[];
  keywords: string[];
  legalities: {
    [key: string]: string;
  };
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  penny_rank: number;
  prices: {
    usd: string;
    usd_foil: string;
    usd_etched: string | null;
    eur: string;
    eur_foil: string;
    tix: string;
  };
  related_uris: {
    gatherer: string;
    tcgplayer_infinite_articles: string;
    tcgplayer_infinite_decks: string;
    edhrec: string;
  };
  purchase_uris: {
    tcgplayer: string;
    cardmarket: string;
    cardhoarder: string;
  };

  //fe stuff
  selected: boolean
}