(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const surplus =
      num(i.saleProceeds) -
      num(i.securedLiens) -
      num(i.taxes) -
      num(i.feesCosts) -
      num(i.otherClaims);

    const estimatedSurplus = round2(surplus);
    const rate = Math.max(0, num(i.compensationPct));
    const potentialGrossCompensation = round2(Math.max(0, estimatedSurplus) * rate / 100);

    return {
      estimatedSurplus,
      compensationRatePct: rate,
      potentialGrossCompensation,
      status: estimatedSurplus > 0 ? "SURPLUS INDICATED — VERIFY CLAIM" : "NO SURPLUS INDICATED"
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.overage = { name:"Overage / Surplus", calculate };
})();
