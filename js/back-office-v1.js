(() => {
  const money = n => Number.isFinite(Number(n))
    ? Number(n).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2})
    : "—";
  const pct = n => Number.isFinite(Number(n)) ? `${Number(n).toFixed(2)}%` : "—";

  function scoreLabel(score) {
    if (score >= 51) return ["STRONG BUY","good"];
    if (score > 10) return ["BUY","good"];
    if (score <= -51) return ["STRONG SELL","bad"];
    if (score < -10) return ["SELL","bad"];
    return ["NEUTRAL","warn"];
  }

  function renderSignal() {
    const scoreMap = {
      priceAbove50:15, priceAbove200:15, aboveVwap:15,
      rsiBullish:10, macdBullish:20, stochBullish:15, volumeConfirm:10
    };
    let score = 0;
    document.querySelectorAll("[data-signal]").forEach(el => {
      if (el.checked) score += scoreMap[el.dataset.signal] || 0;
      else score -= scoreMap[el.dataset.signal] || 0;
    });
    const label = scoreLabel(score);
    document.getElementById("signalScore").textContent = String(score);
    document.getElementById("signalLabel").textContent = label[0];
    const pill = document.getElementById("signalPill");
    pill.className = `pill ${label[1]}`;
    pill.textContent = label[0];
    const needle = document.getElementById("signalNeedle");
    needle.style.transform = `rotate(${score * 0.9}deg)`;
  }

  function renderLadder() {
    const entry = Math.max(0,Number(document.getElementById("ladderEntry").value)||0);
    const stop = Math.max(0,Number(document.getElementById("ladderStop").value)||0);
    const risk = Math.max(0,entry-stop);
    document.getElementById("risk").textContent = money(risk);
    document.getElementById("r1").textContent = money(entry+risk);
    document.getElementById("r2").textContent = money(entry+risk*2);
    document.getElementById("r3").textContent = money(entry+risk*3);
  }

  function renderLinks() {
    const host = document.getElementById("linkVault");
    const filter = document.getElementById("linkCategory").value;
    const links = (window.ROLyfeLinkVault || []).filter(x => filter === "All" || x.category === filter);
    host.innerHTML = links.map(x => `
      <a class="link-btn" href="${x.url}" target="_blank" rel="noopener noreferrer">
        <span>${x.title}</span><span>${x.login ? "LOGIN ↗" : "OPEN ↗"}</span>
      </a>`).join("");
  }

  const calcInputs = {
    overage: () => ({
      saleProceeds:g("oSale"),securedLiens:g("oLiens"),taxes:g("oTaxes"),
      feesCosts:g("oFees"),otherClaims:g("oClaims"),compensationPct:g("oPct")
    }),
    threeTier: () => ({
      arv:g("tArv"),allCashPct:g("tCashPct"),sellerCarryPct:g("tCarryPct"),
      sellerCarryDownPct:g("tDownPct"),sellerCarryInterestPct:g("tCarryRate"),
      sellerCarryTermYears:g("tCarryTerm"),sellerFinancingPct:g("tFinPct"),
      sellerFinancingInterestPct:g("tFinRate"),sellerFinancingBalloonYears:g("tBalloon"),
      amortizationYears:g("tAmort")
    }),
    privateMoney: () => ({
      arv:g("pArv"),purchase:g("pPurchase"),rehab:g("pRehab"),closing:g("pClosing"),
      holding:g("pHolding"),selling:g("pSelling"),contingency:g("pContingency"),
      other:g("pOther"),maxLtvPct:g("pLtv"),maxLtcPct:g("pLtc"),interestPct:g("pRate"),
      pointsPct:g("pPoints"),termMonths:g("pTerm")
    }),
    maxBid: () => ({
      arv:g("mArv"),rehab:g("mRehab"),holding:g("mHolding"),acquisitionClosing:g("mClose"),
      sellingDisposition:g("mSelling"),financing:g("mFinancing"),contingency:g("mContingency"),
      other:g("mOther"),requiredProfit:g("mProfit"),currentBid:g("mBid")
    }),
    fixFlip: () => ({
      arv:g("fArv"),purchase:g("fPurchase"),rehab:g("fRehab"),closing:g("fClosing"),
      holding:g("fHolding"),selling:g("fSelling"),financing:g("fFinancing"),
      contingency:g("fContingency"),other:g("fOther")
    }),
    taxLienYield: () => ({
      principal:g("yPrincipal"),interestRatePct:g("yRate"),holdMonths:g("yMonths"),fees:g("yFees")
    }),
    redemptionYield: () => ({
      invested:g("rInvested"),redemptionAmount:g("rRedemption"),daysHeld:g("rDays"),fees:g("rFees")
    })
  };

  function g(id){ return Number(document.getElementById(id)?.value)||0; }

  function out(id,val){ document.getElementById(id).textContent = val; }

  function calculateOverage(){
    const r = R("overage",calcInputs.overage());
    out("oSurplus",money(r.estimatedSurplus));
    out("oComp",money(r.potentialGrossCompensation));
    out("oStatus",r.status);
  }
  function calculateThreeTier(){
    const r = R("threeTier",calcInputs.threeTier());
    out("tCash",money(r.allCash.price));
    out("tCarryPrice",money(r.sellerCarry.price));
    out("tCarryDown",money(r.sellerCarry.downPayment));
    out("tCarryPay",money(r.sellerCarry.monthlyPayment));
    out("tCarryBalloon",money(r.sellerCarry.balloonBalance));
    out("tFinPrice",money(r.sellerFinancing.price));
    out("tFinPay",money(r.sellerFinancing.monthlyPayment));
    out("tFinBalloon",money(r.sellerFinancing.balloonBalance));
  }
  function calculatePrivateMoney(){
    const r = R("privateMoney",calcInputs.privateMoney());
    out("pBasis",money(r.projectBasis));
    out("pLoan",money(r.loanAmount));
    out("pCash",money(r.borrowerCashRequired));
    out("pLenderRev",money(r.lenderGrossRevenue));
    out("pProfit",money(r.projectProfit));
  }
  function calculateMaxBid(){
    const r = R("maxBid",calcInputs.maxBid());
    out("mMax",money(r.maxBid));out("mRoom",money(r.bidRoom));out("mStatus",r.status);
  }
  function calculateFixFlip(){
    const r = R("fixFlip",calcInputs.fixFlip());
    out("fBasis",money(r.totalProjectBasis));out("fProfit",money(r.estimatedProfit));out("fROI",pct(r.estimatedROIPct));
  }
  function calculateTaxLien(){
    const r = R("taxLienYield",calcInputs.taxLienYield());
    out("yInterest",money(r.interest));out("yGain",money(r.netGain));out("yYield",pct(r.annualizedYieldPct));
  }
  function calculateRedemption(){
    const r = R("redemptionYield",calcInputs.redemptionYield());
    out("rNet",money(r.netProceeds));out("rGain",money(r.netGain));out("rYield",pct(r.annualizedYieldPct));
  }
  function R(id,inputs){ return window.ROLyfeCalculatorRouter.calculate(id,inputs); }

  function bindCalc(id,fn){
    document.querySelectorAll(`#calc-${id} input`).forEach(el => el.addEventListener("input",fn));
  }

  function bindTabs(){
    document.querySelectorAll("[data-calc-tab]").forEach(btn => btn.addEventListener("click",() => {
      const id = btn.dataset.calcTab;
      document.querySelectorAll("[data-calc-tab]").forEach(b => b.classList.toggle("active",b===btn));
      document.querySelectorAll(".calc-panel").forEach(p => p.classList.toggle("active",p.id===`calc-${id}`));
    }));
  }

  function init() {
    renderLinks();
    document.getElementById("linkCategory")?.addEventListener("change",renderLinks);

    document.querySelectorAll("[data-signal]").forEach(el => el.addEventListener("change",renderSignal));
    ["ladderEntry","ladderStop"].forEach(id => document.getElementById(id)?.addEventListener("input",renderLadder));
    bindTabs();

    bindCalc("overage",calculateOverage);
    bindCalc("threeTier",calculateThreeTier);
    bindCalc("privateMoney",calculatePrivateMoney);
    bindCalc("maxBid",calculateMaxBid);
    bindCalc("fixFlip",calculateFixFlip);
    bindCalc("taxLienYield",calculateTaxLien);
    bindCalc("redemptionYield",calculateRedemption);

    calculateOverage();calculateThreeTier();calculatePrivateMoney();calculateMaxBid();
    calculateFixFlip();calculateTaxLien();calculateRedemption();
    renderSignal();renderLadder();

    document.getElementById("setSymbol")?.addEventListener("click",() => {
      const value = (document.getElementById("symbolInput").value||"NASDAQ:AAPL").trim().toUpperCase();
      window.ROLyfeTradingViewSymbol = value;
      const note = document.getElementById("symbolStatus");
      note.textContent = `Symbol set to ${value}. Reload the preview to refresh embedded TradingView widgets.`;
    });

    document.getElementById("openRegrid")?.addEventListener("click",() => {
      const url = window.ROLyfeRegridConfig?.publicProjectEmbedUrl;
      if (url) window.open(url,"_blank","noopener,noreferrer");
      else window.open("https://app.regrid.com/","_blank","noopener,noreferrer");
    });

    window.ROLyfeTradingView?.render();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
