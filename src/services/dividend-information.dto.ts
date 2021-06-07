class DtoDividendInformation {
  yearsOfNotLoweringTheDividend: number
  dividendYield: number
  oneYearDividendGrowth: number
  avgThreeYearDividendGrowth: number
  avgFiveYearDividendGrowth: number

  constructor(
    yearsOfNotLoweringTheDividend: number,
    dividendYield: number,
    oneYearDividendGrowth: number,
    avgThreeYearDividendGrowth: number,
    avgFiveYearDividendGrowth: number
  ) {
    this.yearsOfNotLoweringTheDividend = yearsOfNotLoweringTheDividend
    this.dividendYield = dividendYield
    this.oneYearDividendGrowth = oneYearDividendGrowth
    this.avgThreeYearDividendGrowth = avgThreeYearDividendGrowth
    this.avgFiveYearDividendGrowth = avgFiveYearDividendGrowth
  }
}

export default DtoDividendInformation
