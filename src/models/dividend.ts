import Money from './money'

class Dividend {
  id: number
  exDate: string
  payDate: string
  amount: Money

  constructor(id: number, exDate: string, payDate: string, amount: Money) {
    this.id = id
    this.exDate = exDate
    this.payDate = payDate
    this.amount = amount
  }
}

export default Dividend
