(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const invested = Math.max(0,num(i.invested));
    const redemptionAmount = Math.max(0,num(i.redemptionAmount));
    const daysHeld = Math.max(0,num(i.daysHeld));
    const fees = Math.max(0,num(i.fees));
    const netProceeds = redemptionAmount - fees;
    const netGain = netProceeds - invested;
    const annualizedYieldPct =
      invested > 0 && daysHeld > 0 ? (netGain / invested) * (365 / daysHeld) * 100 : 0;
    return {
      invested:round2(invested),
      redemptionAmount:round2(redemptionAmount),
      fees:round2(fees),
      netProceeds:round2(netProceeds),
      netGain:round2(netGain),
      annualizedYieldPct:round2(annualizedYieldPct)
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.redemptionYield = { name:"Redemption Yield", calculate };
})();
