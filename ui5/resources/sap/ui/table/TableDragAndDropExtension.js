/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TableExtension","sap/ui/table/TableUtils","sap/ui/core/library"],function(T,a,c){"use strict";var S="sap.ui.table";var D=c.dnd.DropPosition;var E={getSessionData:function(o,k){return o.getComplexData(S+(k==null?"":"-"+k));},setSessionData:function(o,s,k){o.setComplexData(S+(k==null?"":"-"+k),s);},getInstanceSessionData:function(o,t){return this.getSessionData(o,t.getId());},setInstanceSessionData:function(o,t,s){this.setSessionData(o,s,t.getId());}};var b={ondragstart:function(e){var o=e.dragSession;if(!o||!o.getDragControl()){return;}var f=o.getDragControl();var s={};if(f.isA("sap.ui.table.Row")){var g=this.getContextByIndex(f.getIndex());var h=f.getDomRef();if(!g||h.classList.contains("sapUiTableGroupHeader")||h.classList.contains("sapUiAnalyticalTableSum")){e.preventDefault();return;}else{s.draggedRowContext=g;}}E.setInstanceSessionData(o,this,s);},ondragenter:function(e){var o=e.dragSession;if(!o||!o.getDropControl()){return;}var s=E.getInstanceSessionData(o,this);var f=o.getDragControl();var g=o.getDropControl();if(!s){s={};}if(g.isA("sap.ui.table.Row")){var h=s.draggedRowContext;var i=this.getContextByIndex(g.getIndex());var j=g.getDomRef();var k=o.getDropInfo().getDropPosition();if((!i&&k===D.On&&a.hasData(this))||(h&&h===i)||j.classList.contains("sapUiTableGroupHeader")||j.classList.contains("sapUiAnalyticalTableSum")){e.setMarked("NonDroppable");}else{if(!i){var l=this.getRows()[a.getNonEmptyVisibleRowCount(this)-1];o.setDropControl(l||this);}if(o.getDropControl()!==this){var v=this._getScrollExtension().isVerticalScrollbarVisible();var t=this.getDomRef("sapUiTableCnt").getBoundingClientRect();o.setIndicatorConfig({width:t.width-(v?16:0),left:t.left+(this._bRtlMode&&v?16:0)});}}}else if(f===g){e.setMarked("NonDroppable");}if(!s.verticalScrollEdge){var p=window.pageYOffset;var V=this.getDomRef("table").getBoundingClientRect();s.verticalScrollEdge={bottom:V.bottom+p,top:V.top+p};}var P=window.pageXOffset;var H=this.getDomRef("sapUiTableCtrlScr").getBoundingClientRect();s.horizontalScrollEdge={left:H.left+P,right:H.right+P};E.setInstanceSessionData(o,this,s);},ondragover:function(e){var o=e.dragSession;if(!o){return;}var s=E.getInstanceSessionData(o,this);if(!s){return;}var i=32;var t=50;var f=o.getDropControl();var g=this._getScrollExtension();var v=g.getVerticalScrollbar();var h=g.getHorizontalScrollbar();var V=s.verticalScrollEdge;var H=s.horizontalScrollEdge;if(V&&v&&f!==this){var p=e.pageY;if(p>=V.top-t&&p<=V.top+t){v.scrollTop-=i;}else if(p<=V.bottom+t&&p>=V.bottom-t){v.scrollTop+=i;}}if(H&&h&&f!==this){var P=e.pageX;if(P>=H.left-t&&P<=H.left+t){h.scrollLeft-=i;}else if(P<=H.right+t&&P>=H.right-t){h.scrollLeft+=i;}}},onlongdragover:function(e){var o=e.dragSession;if(!o){return;}var C=a.getCell(this,e.target);var r=a.getCellInfo(C).rowIndex;var R=r==null?null:this.getRows()[r];var f=o.getDropControl();if(R&&(f==R||!f)){a.Grouping.toggleGroupHeader(this,R.getIndex(),true);}}};var d=T.extend("sap.ui.table.TableDragAndDropExtension",{_init:function(t,s,m){this._oDelegate=b;t.addEventDelegate(this._oDelegate,t);return"DragAndDropExtension";},_debug:function(){this._ExtensionDelegate=b;},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._oDelegate);}this._oDelegate=null;T.prototype.destroy.apply(this,arguments);}});return d;});