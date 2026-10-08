(() => {
  const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
  const round2 = v => Math.round(num(v) * 100) / 100;

  function calculate(i = {}) {
    const arv = num(i.arv);
    const totalOtherCosts =
      num(i.rehab) + num(i.holding) + num(i.acquisitionClosing) +
      num(i.sellingDisposition) + num(i.financing) + num(i.contingency) + num(i.other);
    const maxBid = arv - totalOtherCosts - num(i.requiredProfit);
    const currentBid = Math.max(0,num(i.currentBid));
    return {
      maxBid: round2(maxBid),
      currentBid: round2(currentBid),
      bidRoom: round2(maxBid - currentBid),
      status: currentBid <= maxBid ? "WITHIN MAX BID" : "ABOVE MAX BID / PASS"
    };
  }

  window.ROLyfeCalculators = window.ROLyfeCalculators || {};
  window.ROLyfeCalculators.maxBid = { name:"Auction Max Bid", calculate };
})();
