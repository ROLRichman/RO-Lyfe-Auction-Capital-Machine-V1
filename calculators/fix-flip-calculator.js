(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const arv = num(i.arv);
    const basis =
      num(i.purchase) + num(i.rehab) + num(i.closing) + num(i.holding) +
      num(i.selling) + num(i.financing) + num(i.contingency) + num(i.other);
    const profit = arv - basis;
    const roiBase = num(i.purchase) + num(i.rehab) + num(i.closing);
    const roiPct = roiBase > 0 ? profit / roiBase * 100 : null;
    return {
      totalProjectBasis:round2(basis),
      estimatedProfit:round2(profit),
      estimatedROIPct:roiPct == null ? null : round2(roiPct)
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.fixFlip = { name:"Fix & Flip", calculate };
})();
