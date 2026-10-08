# V1 Integration Map

## TradingView

Official references:

- Advanced Chart widget:
  https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/
- Technical Analysis:
  https://en.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/
- Top Stories:
  https://www.tradingview.com/widget-docs/widgets/news/top-stories/
- Widget collection:
  https://www.tradingview.com/widget-docs/widgets/

The V1 page uses TradingView's documented embed scripts. Container heights are explicitly defined because TradingView recommends defining the container height when using autosize.

## Schwab Network

Official page:

https://www.schwab.com/schwab-network

V1 uses a launch button rather than assuming a third-party iframe is supported.

## Regrid

- Web app:
  https://app.regrid.com/
- API:
  https://support.regrid.com/docs/getting-started-api
- Public project/share guidance:
  https://support.regrid.com/docs/share-your-project

The public Regrid app is not embedded by default. The V1 project includes a placeholder for a permitted public Regrid Project embed URL.

## Weather

Weather.com and Weather.gov are external links in V1. Later we can add a location-aware weather widget/API layer without making the dashboard dependent on one site's iframe rules.

## Vacant Lot Finder

External source:

https://membersflippingmastery.com/

RO'Lyfe should treat this as a lead feed/source, not as an internal dependency.
