window.ROLyfeCalculatorRules = {
  threeTier: {
    defaults: {
      allCashPct: 50,
      sellerCarryPct: 65,
      sellerCarryDownPct: 5,
      sellerCarryInterestPct: 5,
      sellerCarryTermYears: 4,
      sellerFinancingPct: 75,
      sellerFinancingInterestPct: 6,
      sellerFinancingBalloonYears: 5,
      amortizationYears: 30
    },
    negotiationRange: { low: 110000, target: 125000, high: 130000 }
  },
  overage: { compensationMinPct: 20, compensationMaxPct: 40 },
  maxBid: { defaultContingencyPct: 10 },
  privateMoney: {
    defaultLtvPct: 70,
    defaultLtcPct: 90,
    defaultInterestPct: 12,
    defaultPointsPct: 2,
    defaultTermMonths: 12
  }
};
