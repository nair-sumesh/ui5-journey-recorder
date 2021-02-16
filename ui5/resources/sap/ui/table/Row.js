/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','sap/ui/model/Context','./TableUtils',"sap/ui/thirdparty/jquery"],function(E,C,T,q){"use strict";var R=E.extend("sap.ui.table.Row",{metadata:{library:"sap.ui.table",defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell"},_rowAction:{type:"sap.ui.table.RowAction",multiple:false,visibility:"hidden"},_settings:{type:"sap.ui.table.RowSettings",multiple:false,visibility:"hidden"}}}});R.prototype.init=function(){this.initDomRefs();};R.prototype.exit=function(){this.initDomRefs();};R.prototype.getFocusInfo=function(){var t=this.getParent();return t?t.getFocusInfo():E.prototype.getFocusInfo.apply(this,arguments);};R.prototype.applyFocusInfo=function(f){var t=this.getParent();if(t){t.applyFocusInfo(f);}else{E.prototype.applyFocusInfo.apply(this,arguments);}return this;};R.prototype.addStyleClass=function(s){q(this.getDomRefs(false,true)).addClass(s);};R.prototype.removeStyleClass=function(s){q(this.getDomRefs(false,true)).removeClass(s);};R.prototype.initDomRefs=function(){this._mDomRefs={};};R.prototype.getIndex=function(){var t=this.getParent();if(t){var r=t.indexOfRow(this);var n=t.getFixedRowCount();if(n>0&&r<n){return r;}var N=t.getFixedBottomRowCount();var v=t.getVisibleRowCount();if(N>0&&r>=v-N){var i=t._getTotalRowCount();if(i>=v){return i-(v-r);}else{return r;}}return t._getFirstRenderedRowIndex()+r;}return-1;};R.prototype.getDomRefs=function(j,c){var b=function(i){return q(document.getElementById(i));};var d=function(i){return(i?window.document.getElementById(i):null);};var k=(j===true)?"jQuery":"dom",a=(j===true)?b:d,D=this._mDomRefs;if(!D[k]){D[k]={};var t=this.getParent();if(t){var r=t.indexOfRow(this);D[k].rowSelector=a(t.getId()+"-rowsel"+r);D[k].rowAction=a(t.getId()+"-rowact"+r);}D[k].rowScrollPart=a(this.getId());D[k].rowFixedPart=a(this.getId()+"-fixed");D[k].rowSelectorText=a(this.getId()+"-rowselecttext");if(j===true){D[k].row=D[k].rowScrollPart;if(D[k].rowFixedPart.length>0){D[k].row=D[k].row.add(D[k].rowFixedPart);}else{D[k].rowFixedPart=undefined;}if(D[k].rowSelector&&D[k].rowSelector.length>0){D[k].row=D[k].row.add(D[k].rowSelector);}else{D[k].rowSelector=undefined;}if(D[k].rowAction&&D[k].rowAction.length>0){D[k].row=D[k].row.add(D[k].rowAction);}else{D[k].rowAction=undefined;}}}var K=D[k];if(c){return Object.keys(K).map(function(k){return K[k];}).filter(Boolean);}return K;};R.prototype._updateSelection=function(t,m,s){var i=t.isIndexSelected(this.getIndex());var d=this.getDomRefs(true);var S="rowSelect";if(i){S="rowDeselect";}if(d.rowSelector){d.rowSelector.attr("title",!this._bHidden?m.mouse[S]:"");}if(d.rowSelectorText){var a="";if(!this._bHidden&&!T.Grouping.isInSumRow(d.rowSelector)&&!T.Grouping.isInGroupingRow(d.rowSelector)){a=m.keyboard[S];}d.rowSelectorText.text(a);}var r=d.rowScrollPart;if(d.rowFixedPart){r=r.add(d.rowFixedPart);}if(s&&!this._bHidden){r.attr("title",m.mouse[S]);}else{r.removeAttr("title");}if(d.row){d.row.toggleClass("sapUiTableRowSel",i);t._getAccExtension().updateAriaStateOfRow(this,d,i);}};R.prototype.setRowBindingContext=function(c,m,b){var n;if(c&&!(c instanceof C)){n=c;c=c.context;}var $=this.getDomRefs(true).row;this._bHidden=!c;$.toggleClass("sapUiTableRowHidden",this._bHidden);this._collectRenderingInformation(c,n,b);this.setBindingContext(c,m);};R.prototype.setBindingContext=function(c,m){var r=E.prototype.setBindingContext.call(this,c||null,m);this._updateTableCells(c);return r;};R.prototype._updateTableCells=function(c){var t=this.getParent();if(!t){return;}var a=this.getCells(),A=this.getIndex(),h=!!t._updateTableCell,o,$,H;for(var i=0;i<a.length;i++){o=a[i];H=!!o._updateTableCell;$=H||h?o.$().closest("td"):null;if(H){o._updateTableCell(o,c,$,A);}if(h){t._updateTableCell(o,c,$,A);}}};R.prototype._collectRenderingInformation=function(c,n,b){this._oNodeState=undefined;this._iLevel=0;this._bIsExpanded=false;this._bHasChildren=false;this._sTreeIconClass="";if(n){this._oNodeState=n.nodeState;this._iLevel=n.level;this._bIsExpanded=false;this._bHasChildren=false;this._sTreeIconClass="sapUiTableTreeIconLeaf";this._sGroupIconClass="";if(b){if(b.getLevel){this._bIsExpanded=b.isExpanded(this.getIndex());}else if(b.findNode){this._bIsExpanded=this&&this._oNodeState?this._oNodeState.expanded:false;}if(b.nodeHasChildren){if(this._oNodeState){this._bHasChildren=b.nodeHasChildren(n);}}else if(b.hasChildren){this._bHasChildren=b.hasChildren(c);}if(this._bHasChildren){this._sTreeIconClass=this._bIsExpanded?"sapUiTableTreeIconNodeOpen":"sapUiTableTreeIconNodeClosed";this._sGroupIconClass=this._bIsExpanded?"sapUiTableGroupIconOpen":"sapUiTableGroupIconClosed";}}}};R.prototype.destroy=function(){this.removeAllCells();return E.prototype.destroy.apply(this,arguments);};R.prototype.invalidate=function(){return this;};R.prototype.getDragGhost=function(){var t=this.getParent();var o=t.getDomRef();var r=this.getDomRefs();var g;var G;var a;var s=t._getSelectedIndicesCount();function b(e){e.removeAttribute("id");e.removeAttribute("data-sap-ui");e.removeAttribute("data-sap-ui-related");var f=e.children.length;for(var i=0;i<f;i++){b(e.children[i]);}}function c(o,e){var f=o.cloneNode();var h=o.querySelector("thead").cloneNode(true);var i=o.querySelector("tbody").cloneNode();var j=e.cloneNode(true);i.appendChild(j);f.appendChild(h);f.appendChild(i);return f;}g=o.cloneNode();g.classList.add("sapUiTableRowGhost");g.classList.remove("sapUiTableVScr");g.classList.remove("sapUiTableHScr");g.style.width=o.getBoundingClientRect().width+"px";if(r.rowSelector){G=t.getDomRef("sapUiTableRowHdrScr").cloneNode();a=r.rowSelector.cloneNode(true);G.appendChild(a);g.appendChild(G);}if(r.rowFixedPart){G=t.getDomRef("sapUiTableCtrlScrFixed").cloneNode();a=c(t.getDomRef("table-fixed"),r.rowFixedPart);G.appendChild(a);g.appendChild(G);}if(r.rowScrollPart){var S=t.getDomRef("sapUiTableCtrlScr");G=S.cloneNode();a=c(t.getDomRef("table"),r.rowScrollPart);G.appendChild(t.getDomRef("tableCtrlCnt").cloneNode());G.firstChild.appendChild(a);g.appendChild(G);}if(r.rowAction){G=t.getDomRef("sapUiTableRowActionScr").cloneNode();a=r.rowAction.cloneNode(true);G.appendChild(a);g.appendChild(G);}if(s>1){G=document.createElement("div");G.classList.add("sapUiTableRowGhostCount");var d=document.createElement("div");d.textContent=s;G.appendChild(d);g.appendChild(G);}b(g);return g;};return R;});
