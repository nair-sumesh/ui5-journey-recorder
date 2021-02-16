/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/CalendarLegendRenderer','sap/ui/unified/library',"sap/base/Log"],function(C,a,b,l,L){"use strict";var c=l.CalendarDayType;var M={};M.render=function(r,m){var d=m._getStartDate();var t=m.getTooltip_AsString();var i=m.getId();var A={value:i+"-Descr",append:true};r.write("<div");r.writeControlData(m);r.addClass("sapUiCalMonthsRow");r.addClass("sapUiCalRow");r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}if(m._getShowHeader()){A.value=A.value+" "+i+"-Head";}r.writeAccessibilityState(m,{role:"grid",readonly:"true",multiselectable:!m.getSingleSelection()||m.getIntervalSelection(),labelledby:A});r.write(">");r.write("<span id=\""+i+"-Descr\" style=\"display: none;\">"+m._rb.getText("CALENDAR_DIALOG")+"</span>");if(m.getIntervalSelection()){r.write("<span id=\""+i+"-Start\" style=\"display: none;\">"+m._rb.getText("CALENDAR_START_MONTH")+"</span>");r.write("<span id=\""+i+"-End\" style=\"display: none;\">"+m._rb.getText("CALENDAR_END_MONTH")+"</span>");}this.renderRow(r,m,d);r.write("</div>");};M.renderRow=function(r,m,d){var i=m.getId();this.renderHeader(r,m,d);r.write("<div id=\""+i+"-months\" class=\"sapUiCalItems\">");this.renderMonths(r,m,d);r.write("</div>");};M.renderHeader=function(r,m,d){C._checkCalendarDate(d);if(m._getShowHeader()){var o=m._getLocaleData();var i=m.getId();r.write("<div id=\""+i+"-Head\">");this.renderHeaderLine(r,m,o,d);r.write("</div>");}};M.renderHeaderLine=function(r,m,o,d){C._checkCalendarDate(d);var I=m.getId();var e=m.getMonths();var f=new a(d);var w="";var y=0;var Y=[];var i=0;for(i=0;i<e;i++){y=f.getYear();if(Y.length>0&&Y[Y.length-1].iYear==y){Y[Y.length-1].iMonths++;}else{Y.push({iYear:y,iMonths:1});}f.setMonth(f.getMonth()+1);}for(i=0;i<Y.length;i++){var g=Y[i];w=(100/e*g.iMonths)+"%";r.write("<div id=\""+I+"-Head"+i+"\"class=\"sapUiCalHeadText\" style=\"width:"+w+"\">");r.write(g.iYear);r.write("</div>");}};M.renderMonths=function(r,m,d){var h=this.getHelper(m,d);var e=m.getMonths();var w=(100/e)+"%";var o=new a(d);o.setDate(1);for(var i=0;i<e;i++){this.renderMonth(r,m,o,h,w);o.setMonth(o.getMonth()+1);}};M.getHelper=function(m,d){C._checkCalendarDate(d);var h={};h.sLocale=m._getLocale();h.oLocaleData=m._getLocaleData();h.oToday=new a();h.sCurrentMonth=m._rb.getText("CALENDAR_CURRENT_MONTH");h.sId=m.getId();h.oFormatLong=m._getFormatLong();if(m._bLongMonth||!m._bNamesLengthChecked){h.aMonthNames=h.oLocaleData.getMonthsStandAlone("wide");}else{h.aMonthNames=h.oLocaleData.getMonthsStandAlone("abbreviated");h.aMonthNamesWide=h.oLocaleData.getMonthsStandAlone("wide");}var s=m.getLegend();if(s){var o=sap.ui.getCore().byId(s);if(o){if(!(o instanceof sap.ui.unified.CalendarLegend)){throw new Error(o+" is not an sap.ui.unified.CalendarLegend. "+m);}h.oLegend=o;}else{L.warning("CalendarLegend "+s+" does not exist!",m);}}return h;};M.renderMonth=function(r,m,d,h,w){C._checkCalendarDate(d);var A={role:"gridcell",selected:false,label:"",describedby:""};if(!m._bLongMonth&&m._bNamesLengthChecked){A["label"]=h.aMonthNamesWide[d.getMonth()];}var y=m._oFormatYyyymm.format(d.toUTCJSDate(),true);var s=m._checkDateSelected(d);var t=m._getDateType(d);var e=m._checkMonthEnabled(d);r.write("<div");r.writeAttribute("id",h.sId+"-"+y);r.addClass("sapUiCalItem");if(w){r.addStyle("width",w);}if(C._isSameMonthAndYear(d,h.oToday)){r.addClass("sapUiCalItemNow");A["label"]=h.sCurrentMonth+" ";}if(s>0){r.addClass("sapUiCalItemSel");A["selected"]=true;}if(s==2){r.addClass("sapUiCalItemSelStart");A["describedby"]=A["describedby"]+" "+h.sId+"-Start";}else if(s==3){r.addClass("sapUiCalItemSelEnd");A["describedby"]=A["describedby"]+" "+h.sId+"-End";}else if(s==4){r.addClass("sapUiCalItemSelBetween");}else if(s==5){r.addClass("sapUiCalItemSelStart");r.addClass("sapUiCalItemSelEnd");A["describedby"]=A["describedby"]+" "+h.sId+"-Start";A["describedby"]=A["describedby"]+" "+h.sId+"-End";}if(t&&t.type!=c.None){r.addClass("sapUiCalItem"+t.type);if(t.tooltip){r.writeAttributeEscaped('title',t.tooltip);}}if(!e){r.addClass("sapUiCalItemDsbl");A["disabled"]=true;}r.writeAttribute("tabindex","-1");r.writeAttribute("data-sap-month",y);A["label"]=A["label"]+h.oFormatLong.format(d.toUTCJSDate(),true);if(t&&t.type!=c.None){b.addCalendarTypeAccInfo(A,t.type,h.oLegend);}r.writeAccessibilityState(null,A);r.writeClasses();r.writeStyles();r.write(">");r.write("<span");r.addClass("sapUiCalItemText");r.writeClasses();r.write(">");r.write(h.aMonthNames[d.getMonth()]);r.write("</span>");r.write("</div>");};return M;},true);
