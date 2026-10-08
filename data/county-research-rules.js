window.ROLyfeCountyResearchRules = {
  requiredProfileFields: [
    "state","county","taxCollector","taxClaimBureau","treasurer","clerkOfCourt",
    "recorder","assessor","officialTaxSaleUrl","auctionUrl","parcelSearchUrl","gisUrl",
    "primaryAssetType","defaultProcess","delinquencyTimeline","saleFrequency",
    "redemptionPeriod","interestPenalty","auctionMethod","deposit","paymentDeadline",
    "winningBidderRules","otcAvailability","otcTiming","taxDeedProcess","titleRequirements",
    "survivingLiens","specialCountyRules","terminology","lastVerified","sourceNotes","riskLevel"
  ],
  interviewSections: [
    {id:"process",title:"Basic Tax Default Process & Timeline",questions:[
      "When owners fail to pay property taxes, what happens first?",
      "What is the exact timeline from delinquency to sale?",
      "Does the timeline vary by property or tax year?",
      "Is there an official webpage, handout, or guide explaining the process?"
    ]},
    {id:"redemption",title:"Redemption",questions:[
      "Is there a redemption or grace period?",
      "What is required to redeem?",
      "Are penalties and interest charged? If so, how are they calculated?"
    ]},
    {id:"auction",title:"Buying via Auction",questions:[
      "Are liens, deeds, or both auctioned?",
      "Is the sale online or in person?",
      "How exactly does bidding work?",
      "Is there premium bidding, bid-down interest, bid-down ownership, rotational bidding, sealed bidding, or another method?",
      "What are the most common bidder mistakes?"
    ]},
    {id:"otc",title:"OTC / Post-Sale Inventory",questions:[
      "What happens to unsold tax assets after the sale?",
      "Are unsold liens or parcels available OTC?",
      "When and where are OTC lists published?",
      "Can the list be accessed online?"
    ]},
    {id:"dueDiligence",title:"Due Diligence",questions:[
      "What official records should an investor review before bidding?",
      "How can I verify the parcel, tax status, redemption status, and recorded documents?",
      "Are there county-specific title, zoning, occupancy, code, HOA, probate, or bankruptcy items to check?"
    ]}
  ]
};
