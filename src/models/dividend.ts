import Money from './money'

class Dividend {
  id: number
  exDate: Date
  payDate: Date
  amount: Money

  constructor(id: number, exDate: Date, payDate: Date, amount: Money) {
    this.id = id
    this.exDate = exDate
    this.payDate = payDate
    this.amount = amount
  }
}

export default Dividend
