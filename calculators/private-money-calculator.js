(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const arv = Math.max(0,num(i.arv));
    const purchase = Math.max(0,num(i.purchase));
    const rehab = Math.max(0,num(i.rehab));
    const closing = Math.max(0,num(i.closing));
    const holding = Math.max(0,num(i.holding));
    const selling = Math.max(0,num(i.selling));
    const contingency = Math.max(0,num(i.contingency));
    const other = Math.max(0,num(i.other));
    const ltvPct = Math.max(0,num(i.maxLtvPct));
    const ltcPct = Math.max(0,num(i.maxLtcPct));
    const interestPct = num(i.interestPct);
    const pointsPct = num(i.pointsPct);
    const termMonths = Math.max(0,num(i.termMonths));

    const projectBasis = purchase + rehab + closing + holding + selling + contingency + other;
    const ltvLimit = arv * ltvPct / 100;
    const ltcLimit = projectBasis * ltcPct / 100;
    const loanAmount = Math.max(0, Math.min(ltvLimit, ltcLimit));
    const points = loanAmount * pointsPct / 100;
    const monthlyInterest = loanAmount * interestPct / 100 / 12;
    const totalInterest = monthlyInterest * termMonths;
    const lenderGrossRevenue = points + totalInterest;
    const borrowerCashRequired = Math.max(0, projectBasis + points + totalInterest - loanAmount);
    const projectProfit = arv - projectBasis;

    return {
      projectBasis:round2(projectBasis),
      ltvLimit:round2(ltvLimit),
      ltcLimit:round2(ltcLimit),
      loanAmount:round2(loanAmount),
      points:round2(points),
      monthlyInterest:round2(monthlyInterest),
      totalInterest:round2(totalInterest),
      lenderGrossRevenue:round2(lenderGrossRevenue),
      borrowerCashRequired:round2(borrowerCashRequired),
      projectProfit:round2(projectProfit)
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.privateMoney = { name:"Private Money / Lender", calculate };
})();
