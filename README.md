# RO’Lyfe Auction Capital Machine™ — Back Office V1 Drop

This package is the **safe first drop-in layer** for the RO’Lyfe back office.

## Upload rule

Upload these files/folders alongside your existing project. **Do not delete or overwrite your historical backups.**

In particular, preserve:

`dashboard/backups/index.real-estate-center-backup.html`

This package intentionally does **not** replace your live `index.html`.

Start with:

`back-office-v1.html`

and review it before wiring the modules into the production dashboard.

## Folder map

```text
RO-Lyfe-Auction-Capital-Machine/
├── back-office-v1.html
├── css/
│   └── back-office-v1.css
├── data/
│   ├── calculator-rules.js
│   ├── county-research-rules.js
│   ├── link-vault.js
│   ├── regrid-config.js
│   └── tax-yield-state-reference.js
├── js/
│   ├── back-office-v1.js
│   ├── calculator-router.js
│   ├── county-research-engine.js
│   └── tradingview-widgets.js
├── calculators/
│   ├── calculator-registry.js
│   ├── fix-flip-calculator.js
│   ├── max-bid-calculator.js
│   ├── overage-calculator.js
│   ├── private-money-calculator.js
│   ├── redemption-yield-calculator.js
│   ├── tax-lien-yield-calculator.js
│   └── three-tier-offer-calculator.js
├── resources/
│   ├── county-research-call-script.md
│   ├── county-research-playbook.md
│   ├── integration-map.md
│   └── tax-yield-research-notes.md
└── tests/
    └── calculator-tests.js
```

## Back-office design

The UI is intentionally subdued and operational:

- dark console
- compact card hierarchy
- no full-page horizontal overflow
- internal scroll areas only where a table/list needs it
- responsive chart sizing
- mobile touch targets
- buttons and links are contained
- third-party widgets have fixed container heights to reduce layout shifting
- minimal animation
- reduced-motion support

## Trading panel

The preview includes an Advanced Chart plus:

- RSI
- MACD
- Stochastic RSI
- VWAP
- moving-average studies
- volume
- Technical Analysis rating
- Top Stories
- RO’Lyfe Quick Ladder
- Schwab Network launch button
- weather/research links

TradingView officially documents the Advanced Chart as an embeddable widget with studies and container sizing, and its Technical Analysis widget provides the Strong Sell / Sell / Neutral / Buy / Strong Buy rating layer. Top Stories is provided by TradingView as an embeddable Timeline widget. See the research links in `resources/integration-map.md`.

## Moving averages: 200 and 50

The chart configuration uses multiple moving-average studies through the TradingView chart. The embedded chart remains editable, so the exact 50 / 200 lengths can be set in the chart's indicator settings.

The back-office's local signal layer treats:

- price above 50 MA
- price above 200 MA

as separate confirmations.

This is deliberate: the embedded widget is the visualization layer; the RO’Lyfe signal layer is independent.

## Regrid

Do **not** put a Regrid API token in public JavaScript.

`data/regrid-config.js` contains a placeholder for a public Regrid Project URL. Use a Regrid Project embed only after you have a public Project/embed URL that Regrid permits.

The full logged-in Regrid application is not treated as a public iframe target.

The eventual API architecture should be:

```text
RO'Lyfe front end
      ↓
secure server/proxy
      ↓
Regrid API
```

not:

```text
public GitHub JavaScript
      ↓
Regrid token
```

## Vacant Land lane

The Flipping Mastery Vacant Lot Finder is treated as an **external lead source**, not as the RO’Lyfe engine itself.

RO’Lyfe Land Intelligence should ultimately turn a lot lead into:

`parcel → owner → zoning → buildability → taxes → comps → builder demand → max lot price → disposition/capital`

The advertised $8,700 finder payment should be treated as a **program-specific opportunity**, not a universal payment for any vacant lot.

## Calculator inspection

The included calculators are deterministic JavaScript modules with validation/guarding around numeric inputs.

Test coverage includes:

- three-tier offer math
- amortizing monthly payment
- balloon balance
- overage/surplus
- max bid
- private-money loan constraint
- tax-lien simple-interest yield
- redemption yield
- zero / negative guard behavior

Run from the project root:

```bash
node tests/calculator-tests.js
```

Expected result:

`RO'Lyfe calculator tests: PASS`

## Important math note

The three-tier example is mathematically consistent with **ARV $250,000**, not $2,550,000:

- 50% = $125,000
- 65% = $162,500
- 75% = $187,500

The calculator therefore does not silently correct the user's inputs; it calculates whatever ARV is actually entered and the test case uses $250,000.

## 338 Lake Dr

Keep the current test case gated:

- ARV UNVERIFIED
- COMPS REQUIRED
- TITLE REQUIRED
- TAX/CERTIFICATE HISTORY REQUIRED
- REDEMPTION STATUS REQUIRED
- REHAB UNKNOWN
- MAX BID NOT YET CALCULATED
- DEAL STATUS: RESEARCH REQUIRED

## Legal / business caution

Overage/surplus compensation percentages are configurable business inputs, not a representation that any particular jurisdiction permits a specific percentage. Claim rights, agreements, licensing, disclosures, fee limits, court procedures and timing can vary.

Auction, tax sale, lien, redemption, title, financing and underwriting rules must be verified against current official sources and the exact transaction documents before action.

This software is decision-support only. It does not guarantee funding, deal approval, profit, recovery, or investment results.
