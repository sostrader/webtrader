define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){require(["css!charts/indicators/dx/dx.css"]);var e=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},f=[new e(.3,"red",1,"Dash"),new e(.7,"red",1,"Dash")];require(["text!charts/indicators/dx/dx.html"],function(e){var g="#0026ff",h="#00ff21",i="#ff0000";e=a(e),e.appendTo("body"),e.find("input[type='button']").button(),a(".dx_stroke").each(function(){a(this).colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),"adx"===a(this).attr("id")?g="#"+c.formatted:"plus"===a(this).attr("id")?h="#"+c.formatted:"minus"===a(this).attr("id")&&(i="#"+c.formatted)},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),"adx"===a(this).attr("id")?g="#"+c.formatted:"plus"===a(this).attr("id")?h="#"+c.formatted:"minus"===a(this).attr("id")&&(i="#"+c.formatted)}})});var j="Solid";a("#dx_dashStyle").ddslick({imagePosition:"left",width:158,background:"white",onSelected:function(b){a("#dx_dashStyle .dd-selected-image").css("max-width","125px"),j=b.selectedData.value}}),a("#dx_dashStyle .dd-option-image").css("max-width","125px");var k=e.find("#dx_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(f,function(b,c){a(k.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),e.find("#dx_level_delete").click(function(){k.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select levels to delete!"})}):k.rows(".selected").remove().draw()}),e.find("#dx_level_add").click(function(){require(["indicator_levels"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(k.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),e.dialog({autoOpen:!1,resizable:!1,width:450,modal:!0,my:"center",at:"center",of:window,dialogClass:"dx-ui-dialog",buttons:[{text:"OK",click:function(){if(!_.inRange(e.find(".dx_input_width_for_period").val(),parseInt(e.find(".dx_input_width_for_period").attr("min")),parseInt(e.find(".dx_input_width_for_period").attr("max"))))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+e.find(".dx_input_width_for_period").attr("min")+" to "+e.find(".dx_input_width_for_period").attr("max")+" is allowed for "+e.find(".dx_input_width_for_period").closest("tr").find("td:first").text()+"!"})});var c=[];a.each(k.rows().nodes(),function(){var b=a(this).data("level");b&&c.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var d={period:parseInt(e.find(".dx_input_width_for_period").val()),maType:e.find("#dx_ma_type").val(),dxStroke:g,plusDIStroke:h,minusDIStroke:i,strokeWidth:parseInt(e.find("#dx_strokeWidth").val()),dashStyle:j,appliedTo:parseInt(e.find("#dx_appliedTo").val()),levels:c};a(a(".dx").data("refererChartID")).highcharts().series[0].addIndicator("dx",d),b.call(e)}},{text:"Cancel",click:function(){b.call(this)}}]}),e.find("select").selectmenu({width:160}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".dx").length?void c(b,this.open):void a(".dx").data("refererChartID",b).dialog("open")}}});