export interface MtgCardResponse {
    object: string,
    has_more: boolean,
    total_cards: number,
    next_page: string,
    data: MtgCard[]
}
export interface MtgCard {
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