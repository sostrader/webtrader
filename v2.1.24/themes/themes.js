define(["exports","jquery","../windows/windows","../common/util","highstock","jquery-growl"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.confirmationDialog=void 0;var e=d(b),f=d(c),g=null,h=local_storage.get("theme"),i=local_storage.get("custom_theme");h=h&&h.name,h?require(["lib/highstock/themes/"+h]):Highcharts.setOptions(i?i:{plotOptions:{candlestick:{lineColor:"rgba(0,0,0,1)",color:"rgba(215,24,24,1)",upColor:"rgba(2,146,14,1)",upLineColor:"rgba(0,0,0,1)"}}}),e["default"]("a.theme_dark_blue, a.theme_dark_green, a.theme_dark_unica, a.theme_gray, a.theme_grid, a.theme_grid_light, a.theme_sand_signika, a.theme_skies, a.theme_default").off("click").on("click",function(){var a=e["default"](this),b=a.text(),c=a.attr("class");j(null,c,b)});var j=a.confirmationDialog=function(a,b,c){return g?void g.moveToTop():void require(["text!themes/themes.html"],function(d){d=e["default"](d).i18n(),g=f["default"].createBlankWindow(d,{dialogClass:"dialog-confirm",width:360,height:175,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!1,closeOnEscape:!1,modal:!0,ignoreTileAction:!0,destroy:function(){g=null}}),d.find("#apply").on("click",function(){e["default"].growl.notice({message:"Loading "+c});var d=b.replace("theme_","").replace("_","-");a?(local_storage.remove("theme"),local_storage.set("custom_theme",a)):"default"===d?(local_storage.remove("theme"),local_storage.remove("custom_theme")):local_storage.set("theme",{name:d}),location.reload()}),d.find("#cancel").on("click",function(){g.dialog("close"),g.dialog("destroy")}),g.dialog("open")})};a["default"]={confirmationDialog:j}});