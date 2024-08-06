export enum ApiUrl {
  // Base = 'https://api.pokemontcg.io/v2',
  Base = 'https://data-api.binance.vision/api/v3',
  Cards = ApiUrl.Base + '/cards',
  Types = ApiUrl.Base + '/types',
  Subtypes = ApiUrl.Base + '/subtypes',
  Supertypes = ApiUrl.Base + '/supertypes',
  // GetBtcUsdt = ApiUrl.Base + '/exchangeInfo?symbol=BTCUSDT',
  GetBtcUsdt = ApiUrl.Base + '/ticker/24hr?symbol=BTCUSDT',
}
