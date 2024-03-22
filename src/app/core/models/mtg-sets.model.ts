export interface MtgSetResponse {
    object: string,
    has_more: boolean,
    data: MtgSet[],
}
export interface MtgSet {
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
    icon_svg_uri: string,
}