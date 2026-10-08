window.ROLyfeCountyResearchEngine = (() => {
  function makeProfile(overrides = {}) {
    return {
      state:"",county:"",taxCollector:"",taxClaimBureau:"",treasurer:"",
      clerkOfCourt:"",recorder:"",assessor:"",officialTaxSaleUrl:"",auctionUrl:"",
      parcelSearchUrl:"",gisUrl:"",primaryAssetType:"",defaultProcess:"",
      delinquencyTimeline:"",saleFrequency:"",redemptionPeriod:"",interestPenalty:"",
      auctionMethod:"",deposit:"",paymentDeadline:"",winningBidderRules:"",
      otcAvailability:"",otcTiming:"",taxDeedProcess:"",titleRequirements:"",
      survivingLiens:"",specialCountyRules:"",terminology:[],lastVerified:"",
      sourceNotes:"",riskLevel:"RESEARCH REQUIRED",...overrides
    };
  }
  function completeness(profile) {
    const required = window.ROLyfeCountyResearchRules?.requiredProfileFields || [];
    let present = 0;
    for (const key of required) {
      const v = profile[key];
      if (Array.isArray(v) ? v.length : String(v ?? "").trim()) present++;
    }
    return {present,total:required.length,percent:required.length ? Math.round(present/required.length*100) : 0};
  }
  function interview(sectionId) {
    return [...((window.ROLyfeCountyResearchRules?.interviewSections || [])
      .find(s => s.id === sectionId)?.questions || [])];
  }
  function classify(profile) {
    const text = [profile.primaryAssetType,profile.defaultProcess,profile.auctionMethod,profile.otcAvailability]
      .join(" ").toLowerCase();
    if (/tax lien/.test(text) && /tax deed/.test(text)) return "LIEN + DEED";
    if (/tax lien/.test(text)) return "TAX LIEN";
    if (/redeemable deed/.test(text)) return "REDEEMABLE DEED";
    if (/tax deed/.test(text)) return "TAX DEED";
    return "RESEARCH REQUIRED";
  }
  return {makeProfile,completeness,interview,classify};
})();
