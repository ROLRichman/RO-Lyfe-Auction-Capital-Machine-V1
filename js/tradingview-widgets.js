window.ROLyfeTradingView = (() => {
  function settings() {
    return {
      chart: {
        autosize:true,
        symbol: window.ROLyfeTradingViewSymbol || "NASDAQ:AAPL",
        interval:"D",
        timezone:"exchange",
        theme:"dark",
        style:"1",
        locale:"en",
        allow_symbol_change:true,
        hide_side_toolbar:false,
        withdateranges:true,
        save_image:false,
        studies:[
          "Volume@tv-basicstudies",
          "VWAP@tv-basicstudies",
          "RSI@tv-basicstudies",
          "MACD@tv-basicstudies",
          "StochasticRSI@tv-basicstudies",
          "MASimple@tv-basicstudies",
          "MASimple@tv-basicstudies"
        ],
        support_host:"https://www.tradingview.com"
      },
      technical:{
        interval:"1D",width:"100%",height:"100%",isTransparent:true,
        symbol:window.ROLyfeTradingViewSymbol || "NASDAQ:AAPL",
        colorTheme:"dark",locale:"en"
      },
      topStories:{
        displayMode:"regular",feedMode:"symbol",
        symbol:window.ROLyfeTradingViewSymbol || "NASDAQ:AAPL",
        colorTheme:"dark",isTransparent:true,locale:"en",
        width:"100%",height:"100%"
      }
    };
  }

  function inject(containerId, widgetName, payload) {
    const host = document.getElementById(containerId);
    if (!host) return;
    host.replaceChildren();
    const outer = document.createElement("div");
    outer.className = "tradingview-widget-container";
    outer.style.cssText = "height:100%;width:100%";
    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    inner.style.cssText = "height:100%;width:100%";
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widgetName}.js`;
    script.text = JSON.stringify(payload);
    outer.append(inner,script);
    host.append(outer);
  }

  function render() {
    const s = settings();
    inject("tvChart","advanced-chart",s.chart);
    inject("tvTechnical","technical-analysis",s.technical);
    inject("tvTopStories","timeline",s.topStories);
  }

  return {settings,render};
})();
