define(["exports","jquery","../windows/windows","../websockets/binary_websockets","../navigation/menu","moment","lodash","text!./download.html","jquery-ui","jquery-growl","../common/util","highstock","highcharts-exporting","css!./download.css"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var j=i(b),k=i(c),l=i(d),m=i(e),n=i(f),o=i(g),p=i(h),q=null,r=[],s=[{name:"Ticks".i18n(),timePeriods:[{name:"1 Tick",code:"1t"}]},{name:"Minutes".i18n(),timePeriods:[{name:"1 min",code:"1m"},{name:"2 mins",code:"2m"},{name:"3 mins",code:"3m"},{name:"5 mins",code:"5m"},{name:"10 mins",code:"10m"},{name:"15 mins",code:"15m"},{name:"30 mins",code:"30m"}]},{name:"Hours".i18n(),timePeriods:[{name:"1 hour",code:"1h"},{name:"2 hours",code:"2h"},{name:"4 hours",code:"4h"},{name:"8 hours",code:"8h"}]},{name:"Days".i18n(),timePeriods:[{name:"1 day",code:"1d"}]}],t=900,u=500,v=void 0,w=(local_storage.get("i18n")||{value:"en"}).value,x=getAppURL(),y=x+"?affiliates=true&instrument={0}&timePeriod={1}&lang="+w,z='<iframe src="'+y+'" width="350" height="400" style="overflow-y : hidden;" scrolling="no" />',A="https://twitter.com/share?url={0}&text={1}",B="https://facebook.com/sharer/sharer.php?u={0}",C="https://plus.google.com/share?url={0}",D="https://www.blogger.com/blog-this.g?u={0}&n={1}",E="http://vk.com/share.php?url={0}&title={1}",F="ar"===w,G=function(a,b,c){var d=j["default"](".downloadChart");d.highcharts()&&d.highcharts().destroy(),d.highcharts("StockChart",{chart:{spacingLeft:0,marginLeft:45},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!1}},title:{text:a.display_name+" ("+b+")"},credits:{href:"#",text:""},xAxis:{labels:{formatter:function(){var a=this.axis.defaultLabelFormatter.call(this);return a.replace(".","")}}},yAxis:[{opposite:!1,labels:{formatter:function(){return this.value},align:"center"}}],tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0,xDateFormat:"%A, %b %e, %Y %H:%M:%S"},exporting:{enabled:!1,url:"https://export.highcharts.com",filename:a.display_name.split(" ").join("_")+"("+b+")"},rangeSelector:{enabled:!1}});var e=d.highcharts();e.showLoading(),j["default"](".download_show").prop("disabled",!0);var f=n["default"].utc(c,"DD/MM/YYYY HH:mm").unix(),g=f+1800,h={ticks_history:a.symbol,start:f};isTick(b)||(h.granularity=convertToTimeperiodObject(b).timeInSeconds(),h.style="candles",g=f+1e3*h.granularity),n["default"].utc().unix()<g&&(g=n["default"].utc().unix()),h.end=g,l["default"].send(h).then(function(c){var d=[];isTick(b)?c.history.times.forEach(function(a,b){d.push([1e3*parseInt(a),parseFloat(c.history.prices[b])])}):c.candles.forEach(function(a){d.push([1e3*a.epoch,parseFloat(a.open),parseFloat(a.high),parseFloat(a.low),parseFloat(a.close)])});var f=d.length;if(0===f)return j["default"].growl.error({message:"There is no historical data available!"}),e.hideLoading(),void j["default"](".download_show").prop("disabled",!1);var g=f>100?100:f-1;e.xAxis[0].setExtremes(d[0][0],d[g][0]);var h=a.display_name,i={id:"_"+Date.now(),name:h,data:d,type:isTick(b)?"line":"candlestick",dataGrouping:{enabled:!1},states:{hover:{enabled:!1}}};isTick(b)&&(i.marker={enabled:!0,radius:4}),e.addSeries(i),e.hideLoading(),j["default"](".download_show").prop("disabled",!1),H()})["catch"](function(a){j["default"].growl.error({message:a.message}),e.hideLoading(),j["default"](".download_show").prop("disabled",!1)}),v=b,K(a,b)},H=function(){if(q){var a=q.dialog("widget"),b=j["default"](".downloadChart").height(a.height()-100).highcharts();b&&b.reflow();var c=j["default"](".download_window .share-button"),d=j["default"](".download_window .exportOverlay"),e=a.width()-(c.offset().left+c.outerWidth()-a.offset().left)+1;d.css("right",e+"px")}},I=a.init=function(a){a.click(function(){if(q)q.moveToTop();else{q=k["default"].createBlankWindow(j["default"]('<div class="download_window"/>'),{title:"View Historical Data".i18n(),width:t,minWidth:t,minHeight:u,height:u,resize:H}),q.track({module_id:"download",is_unique:!0,data:null}),q.dialog("open"),q.closest("div.ui-dialog").css("overflow","visible");var a=j["default"](p["default"]).i18n();a.find(".download_fromDate").datepicker({changeMonth:!0,changeYear:!0,dateFormat:"dd/mm/yy",showButtonPanel:!0,minDate:n["default"].utc().subtract(1,"years").toDate(),maxDate:n["default"].utc().toDate()}).click(function(){j["default"](this).datepicker("show")}),a.find(".download_fromTime").timepicker({showCloseButton:!0}).click(function(){j["default"](this).timepicker("show")}),a.appendTo(q),l["default"].cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(b){r=m["default"].extractChartableMarkets(b),r=m["default"].sortMenu(r);var c=j["default"]("<ul>"),d=void 0;r.forEach(function(b){var e=j["default"]("<ul>");b.submarkets.forEach(function(b){var c=j["default"]("<ul>");b.instruments.forEach(function(b){var e=j["default"]("<li>");e.append(b.display_name),e.data("instrumentObject",b),e.click(function(){var b=j["default"](this).data("instrumentObject");j["default"](".download_instruments").data("instrumentObject",b).html(b.display_name),j["default"](".download_instruments_container > ul").toggle(),J(60*j["default"](this).data("instrumentObject").delay_amount,a)}),o["default"].isUndefined(d)&&(d=b),c.append(e)}),e.append(j["default"]("<li>").append(b.name).append(c))}),c.append(j["default"]("<li>").append(b.name).append(e))}),j["default"](".download_instruments_container").append(c);var e=F?{position:{my:"right top",at:"left top"}}:{};c.menu(e).toggle();var f=j["default"](".download_instruments");f.click(function(){j["default"](".download_instruments_container > ul").toggle()}).blur(function(){j["default"](".download_instruments_container > ul").hide()}),f.data("instrumentObject",d),f.html(d.display_name),J(60*f.data("instrumentObject").delay_amount,a),j["default"](".download_show").click()})["catch"](function(a){j["default"].growl.error({message:a.message})});var b=j["default"](".download_timePeriod");b.click(function(){return j["default"](".download_timePeriod_container > ul").toggle()}).blur(function(){return j["default"](".download_timePeriod_container > ul").hide()}),b.data("timePeriodObject",{name:"1 day",code:"1d"}),b.html("1 day"),j["default"](".download_fromTime").hide(),a.find(".download_show").click(function(){var a=j["default"](".download_instruments"),b=j["default"](".download_timePeriod"),c=a.data("instrumentObject"),d=b.data("timePeriodObject");G(c,d.code,j["default"](".download_fromDate").val()+" "+j["default"](".download_fromTime").val())}),a.find(".download_fromDate").val(n["default"].utc().subtract(1,"years").format("DD/MM/YYYY")),a.find(".share-button").click(function(){return a.find(".overlay").toggle()}),L()}})},J=function(a,b){var c=j["default"](".download_timePeriod"),d=void 0,e=!1;c.find("ul").length>0&&c.find("ul")[0].remove();var f=j["default"]("<ul>");s.forEach(function(g){var h=j["default"]("<ul>");g.timePeriods.forEach(function(f){var g=j["default"]("<li>");if(d=convertToTimeperiodObject(f.code).timeInSeconds(),g.append(f.name),g.data("timePeriodObject",f),g.click(function(){var a=j["default"](this).data("timePeriodObject");j["default"](".download_timePeriod").data("timePeriodObject",a).html(j["default"](this).data("timePeriodObject").name),j["default"](".download_timePeriod_container > ul").toggle();var c="1d"===a.code,d=b.find(".download_fromTime");c?(d.val("00:00"),d.hide()):d.show()}),!o["default"].isUndefined(c.data("timePeriodObject"))&&!e){var i=c.data("timePeriodObject"),k=convertToTimeperiodObject(i.code).timeInSeconds();a>k&&(g.click(),j["default"](".download_timePeriod_container > ul").toggle()),e=!0}h.append(g)}),f.append(j["default"]("<li>").append(g.name).append(h))}),j["default"](".download_timePeriod_container").append(f);var g=F?{position:{my:"right top",at:"left top"}}:{};f.menu(g).toggle()},K=function(a,b){var c=j["default"](".download_table .fbShareLink"),d=j["default"](".download_table .twitterShareLink"),e=j["default"](".download_table .bloggerShareLink"),f=j["default"](".download_table .gPlusShareLink"),g=j["default"](".download_table .vkShareLink"),h=j["default"](".download_table .exportChartURLShare"),i=j["default"](".download_table .exportChartIframeShare");c.attr("href",B.format(encodeURIComponent(y.format(a.symbol,b)))),d.attr("href",A.format(encodeURIComponent(y.format(a.symbol,b)),a.display_name+"("+b+")")),f.attr("href",C.format(encodeURIComponent(y.format(a.symbol,b)))),e.attr("href",D.format(y.format(a.symbol,b),a.display_name+"("+b+")")),g.attr("href",E.format(y.format(a.symbol,b),a.display_name+"("+b+")")),h.val(y.format(a.symbol,b)),i.val(z.format(a.symbol,b))},L=function(){var a=j["default"](".download_table #png"),b=j["default"](".download_table #pdf"),c=j["default"](".download_table #csv"),d=j["default"](".download_table #svg");a.click(function(){var a=j["default"](".downloadChart").highcharts();a.exportChartLocal()}),b.click(function(){var a=j["default"](".downloadChart").highcharts();a.exportChart({type:"application/pdf"})}),d.click(function(){var a=j["default"](".downloadChart").highcharts();a.exportChart({type:"image/svg+xml"})}),c.click(function(){var a=j["default"](".downloadChart").highcharts(),b=a.series[0],c=isTick(v),d=b.options.name+" ("+v+").csv",e=b.options.data.map(function(a){var b=a[0],d=a[1];if(c)return'"'+n["default"].utc(b).format("YYYY-MM-DD HH:mm:ss")+'",'+ +d;var e=a[2],f=a[3],g=a[4];return'"'+n["default"].utc(b).format("YYYY-MM-DD HH:mm")+'",'+d+","+e+","+f+","+g}),f=(c?"Date,Tick\n":"Date,Open,High,Low,Close\n")+e.join("\n");download_file_in_browser(d,"text/csv;charset=utf-8;",f)})};a["default"]={init:I}});