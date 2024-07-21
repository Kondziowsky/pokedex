export interface CardResponse {
 data: Card;
}

export interface CardWithPaginationResponse {
  count: number;
  data: Card[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: ISet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  images: ICardImage;
  tcgplayer?: ITCGPlayer;
  cardmarket?: ICardmarket;
}

export interface IAbility {
  name: string;
  text: string;
  type: string;
}

export interface IAttack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
}

export interface IResistance {
  type: string;
  value: string;
}

export interface IWeakness {
  type: string;
  value: string;
}

export interface ISet {
  id: string;
  images: ISetImage;
  legalities: ILegality;
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

export interface IQuery {
  name: string;
  value: string | number;
}

export interface IAncientTrait {
  name: string;
  text: string;
}

export interface ILegality {
  [key: string]: string;
}

export interface ICardImage {
  small: string;
  large: string;
}

export interface ISetImage {
  symbol: string;
  logo: string;
}

export interface ITCGPlayer {
  url: string;
  prices: {
    [key: string]: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
  };
}

export interface ICardmarket {
  url: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
  };
}

export interface PokemonTypesResponse {
  data: string[];
}

export interface PokemonFilters {
  pokemonName: string | null;
  selectedType: string | null;
  selectedSubtype: string | null;
  selectedSupertype: string | null;
}
