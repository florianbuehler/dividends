import Money from '../models/money'

class DtoDividend {
  payDate: Date
  amount: Money

  constructor(payDate: Date, amount: Money) {
    this.payDate = payDate
    this.amount = amount
  }
}

export default DtoDividend
