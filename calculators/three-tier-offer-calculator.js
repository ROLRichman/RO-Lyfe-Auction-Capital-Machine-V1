(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function monthlyPayment(principal, annualRatePct, amortYears) {
    const p = Math.max(0, num(principal));
    const r = num(annualRatePct) / 100 / 12;
    const termMonths = Math.max(1, Math.round(num(amortYears) * 12));
    if (p === 0) return 0;
    if (r === 0) return p / termMonths;
    return p * r / (1 - Math.pow(1 + r, -termMonths));
  }

  function balanceAfterPayments(principal, annualRatePct, amortYears, paymentsMade) {
    const p = Math.max(0, num(principal));
    const r = num(annualRatePct) / 100 / 12;
    const termMonths = Math.max(1, Math.round(num(amortYears) * 12));
    const k = Math.max(0, Math.min(Math.round(num(paymentsMade)), termMonths));
    if (p === 0 || k >= termMonths) return 0;
    if (r === 0) return Math.max(0, p * (1 - k / termMonths));
    const payment = monthlyPayment(p, annualRatePct, amortYears);
    return Math.max(0, p * Math.pow(1+r, k) - payment * ((Math.pow(1+r, k)-1)/r));
  }

  function calculate(i = {}) {
    const arv = Math.max(0, num(i.arv));
    const amortizationYears = Math.max(1, num(i.amortizationYears) || 30);

    const cashPrice = arv * num(i.allCashPct) / 100;

    const carryPrice = arv * num(i.sellerCarryPct) / 100;
    const carryDown = carryPrice * num(i.sellerCarryDownPct) / 100;
    const carryPrincipal = Math.max(0, carryPrice - carryDown);
    const carryMonths = Math.max(0, Math.round(num(i.sellerCarryTermYears) * 12));
    const carryPayment = monthlyPayment(carryPrincipal, num(i.sellerCarryInterestPct), amortizationYears);
    const carryBalloon = balanceAfterPayments(
      carryPrincipal, num(i.sellerCarryInterestPct), amortizationYears, carryMonths
    );
    const carryRevenue = carryDown + carryPayment * carryMonths + carryBalloon;

    const financingPrice = arv * num(i.sellerFinancingPct) / 100;
    const financingMonths = Math.max(0, Math.round(num(i.sellerFinancingBalloonYears) * 12));
    const financingPayment = monthlyPayment(financingPrice, num(i.sellerFinancingInterestPct), amortizationYears);
    const financingBalloon = balanceAfterPayments(
      financingPrice, num(i.sellerFinancingInterestPct), amortizationYears, financingMonths
    );
    const financingRevenue = financingPayment * financingMonths + financingBalloon;

    return {
      arv: round2(arv),
      allCash: { price: round2(cashPrice) },
      sellerCarry: {
        price: round2(carryPrice),
        downPayment: round2(carryDown),
        principal: round2(carryPrincipal),
        monthlyPayment: round2(carryPayment),
        payments: carryMonths,
        balloonBalance: round2(carryBalloon),
        scheduledRevenue: round2(carryRevenue)
      },
      sellerFinancing: {
        price: round2(financingPrice),
        downPayment: 0,
        principal: round2(financingPrice),
        monthlyPayment: round2(financingPayment),
        payments: financingMonths,
        balloonBalance: round2(financingBalloon),
        scheduledRevenue: round2(financingRevenue)
      }
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.threeTier = { name:"Three-Tier Offer", calculate, monthlyPayment, balanceAfterPayments };
})();
