(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const principal = Math.max(0,num(i.principal));
    const annualRatePct = num(i.interestRatePct);
    const holdMonths = Math.max(0,num(i.holdMonths));
    const fees = Math.max(0,num(i.fees));
    const interest = principal * annualRatePct / 100 * (holdMonths / 12);
    const totalReturn = principal + interest - fees;
    const netGain = totalReturn - principal;
    const annualizedYieldPct =
      principal > 0 && holdMonths > 0 ? (netGain / principal) * (12 / holdMonths) * 100 : 0;
    return {
      principal:round2(principal),
      interest:round2(interest),
      fees:round2(fees),
      totalReturn:round2(totalReturn),
      netGain:round2(netGain),
      annualizedYieldPct:round2(annualizedYieldPct)
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.taxLienYield = { name:"Tax Lien Yield", calculate };
})();
