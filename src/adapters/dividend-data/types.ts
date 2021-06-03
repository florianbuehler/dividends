export type Dividend = {
  id: number
  exDate: string
  payDate: string
  amount: number
  currency: string
}

export type DividendStock = {
  name: string
  symbol: string
  isin: string
  wkn: string
  exchange: string
  dividends: Dividend[]
}
