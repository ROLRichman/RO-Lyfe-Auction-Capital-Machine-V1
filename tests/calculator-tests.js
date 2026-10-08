const fs = require("fs");
const vm = require("vm");

global.window = {};
const context = vm.createContext(global);

[
  "calculators/overage-calculator.js",
  "calculators/three-tier-offer-calculator.js",
  "calculators/private-money-calculator.js",
  "calculators/max-bid-calculator.js",
  "calculators/fix-flip-calculator.js",
  "calculators/tax-lien-yield-calculator.js",
  "calculators/redemption-yield-calculator.js",
  "js/calculator-router.js"
].forEach(file => vm.runInContext(fs.readFileSync(file,"utf8"), context));

const c = global.window.ROLyfeCalculators;
const R = global.window.ROLyfeCalculatorRouter;

function assert(ok,msg){ if(!ok) throw new Error(msg); }
function close(a,b,t=0.01){ return Math.abs(a-b) <= t; }

const tier = c.threeTier.calculate({
  arv:250000,
  allCashPct:50,
  sellerCarryPct:65,
  sellerCarryDownPct:5,
  sellerCarryInterestPct:5,
  sellerCarryTermYears:4,
  sellerFinancingPct:75,
  sellerFinancingInterestPct:6,
  sellerFinancingBalloonYears:5,
  amortizationYears:30
});

assert(tier.allCash.price === 125000,"Three-tier: cash price");
assert(tier.sellerCarry.price === 162500,"Three-tier: carry price");
assert(tier.sellerCarry.downPayment === 8125,"Three-tier: carry down payment");
assert(close(tier.sellerCarry.monthlyPayment,828.72,0.1),"Three-tier: carry monthly payment");
assert(close(tier.sellerCarry.balloonBalance,144541.31,2),"Three-tier: carry balloon");
assert(tier.sellerFinancing.price === 187500,"Three-tier: financing price");
assert(close(tier.sellerFinancing.monthlyPayment,1124.16,0.1),"Three-tier: financing monthly payment");
assert(close(tier.sellerFinancing.balloonBalance,174476.92,2),"Three-tier: financing balloon");

const overage = c.overage.calculate({
  saleProceeds:250000,
  securedLiens:125000,
  taxes:5000,
  feesCosts:5000,
  otherClaims:10000,
  compensationPct:20
});
assert(overage.estimatedSurplus===105000,"Overage: surplus");
assert(overage.potentialGrossCompensation===21000,"Overage: compensation");

const maxBid = c.maxBid.calculate({
  arv:300000,rehab:50000,holding:10000,acquisitionClosing:10000,
  sellingDisposition:15000,financing:5000,contingency:10000,other:0,
  requiredProfit:40000,currentBid:150000
});
assert(maxBid.maxBid===160000,"Max bid");
assert(maxBid.bidRoom===10000,"Max bid room");

const pm = c.privateMoney.calculate({
  arv:250000,purchase:125000,rehab:60000,closing:5000,holding:5000,
  selling:15000,contingency:10000,other:0,maxLtvPct:70,maxLtcPct:90,
  interestPct:12,pointsPct:2,termMonths:12
});
assert(pm.loanAmount===175000,"Private money loan constrained by LTV");
assert(pm.projectProfit===30000,"Private money profit");

const y = c.taxLienYield.calculate({
  principal:10000,interestRatePct:12,holdMonths:12,fees:100
});
assert(y.interest===1200,"Tax lien interest");
assert(y.netGain===1100,"Tax lien net gain");
assert(y.annualizedYieldPct===11,"Tax lien annualized yield");

const ry = c.redemptionYield.calculate({
  invested:10000,redemptionAmount:11000,daysHeld:180,fees:100
});
assert(ry.netGain===900,"Redemption net gain");
assert(ry.annualizedYieldPct===18.25,"Redemption annualized yield");

assert(R.available().length===7,"Router registry");

console.log("RO'Lyfe calculator tests: PASS");
