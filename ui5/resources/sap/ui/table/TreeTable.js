/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Table','sap/ui/model/ClientTreeBindingAdapter','sap/ui/model/TreeBindingCompatibilityAdapter','./library','sap/ui/core/Element','./TableUtils',"sap/base/Log","sap/base/assert"],function(T,C,a,l,E,b,L,c){"use strict";var d=T.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false,deprecated:true},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},rootLevel:{type:"int",group:"Data",defaultValue:0}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:"sap.ui.table.TableRenderer"});d.prototype.init=function(){T.prototype.init.apply(this,arguments);b.Grouping.setTreeMode(this);};d.prototype.bindRows=function(B){B=T._getSanitizedBindingInfo(arguments);if(B){if(!B.parameters){B.parameters={};}B.parameters.rootLevel=this.getRootLevel();B.parameters.collapseRecursive=this.getCollapseRecursive();B.parameters.numberOfExpandedLevels=B.parameters.numberOfExpandedLevels||(this.getExpandFirstLevel()?1:0);}return T.prototype.bindRows.call(this,B);};d.prototype._bindAggregation=function(n,B){T.prototype._bindAggregation.call(this,n,B);var o=this.getBinding("rows");if(n==="rows"&&o){o.attachEvents({selectionChanged:this._onSelectionChanged.bind(this)});}};d.prototype.setSelectionMode=function(s){var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();s=b.sanitizeSelectionMode(this,s);this.setProperty("selectionMode",s);}else{T.prototype.setSelectionMode.call(this,s);}return this;};d.prototype.setFixedRowCount=function(r){L.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this;};d.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true;}return E.prototype.isTreeBinding.apply(this,arguments);};d.prototype.getBinding=function(n){n=n||"rows";var B=E.prototype.getBinding.call(this,n);if(B&&n==="rows"&&!B.getLength){if(B.isA("sap.ui.model.odata.ODataTreeBinding")){a(B,this);}else if(B.isA("sap.ui.model.odata.v2.ODataTreeBinding")){B.applyAdapterInterface();}else if(B.isA("sap.ui.model.ClientTreeBinding")){C.apply(B);}else{L.error("Binding not supported by sap.ui.table.TreeTable");}}return B;};d.prototype._getContexts=function(s,i,t){var B=this.getBinding("rows");if(B){return B.getNodes(s,i,t);}else{return[];}};d.prototype._onGroupHeaderChanged=function(r,e){this.fireToggleOpenState({rowIndex:r,rowContext:this.getContextByIndex(r),expanded:e});};d.prototype.expand=function(r){b.Grouping.toggleGroupHeader(this,r,true);return this;};d.prototype.collapse=function(r){b.Grouping.toggleGroupHeader(this,r,false);return this;};d.prototype.collapseAll=function(){var B=this.getBinding("rows");if(B){B.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};d.prototype.expandToLevel=function(i){var B=this.getBinding("rows");c(B&&B.expandToLevel,"TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(B&&B.expandToLevel){B.expandToLevel(i);}return this;};d.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){return B.isExpanded(r);}return false;};d.prototype.isIndexSelected=function(r){var B=this.getBinding("rows");if(B&&B.isIndexSelected){return B.isIndexSelected(r);}else{return T.prototype.isIndexSelected.call(this,r);}};d.prototype.setSelectedIndex=function(r){if(r===-1){this.clearSelection();}var B=this.getBinding("rows");if(B&&B.findNode&&B.setNodeSelection){B.setSelectedIndex(r);}else{T.prototype.setSelectedIndex.call(this,r);}return this;};d.prototype.getSelectedIndices=function(){var B=this.getBinding("rows");if(B&&B.findNode&&B.getSelectedIndices){return B.getSelectedIndices();}else{return T.prototype.getSelectedIndices.call(this);}};d.prototype.setSelectionInterval=function(f,t){var s=this.getSelectionMode();if(s===l.SelectionMode.None){return this;}var B=this.getBinding("rows");if(B&&B.findNode&&B.setSelectionInterval){if(s===l.SelectionMode.Single){B.setSelectionInterval(f,f);}else{B.setSelectionInterval(f,t);}}else{T.prototype.setSelectionInterval.call(this,f,t);}return this;};d.prototype.addSelectionInterval=function(f,t){var s=this.getSelectionMode();if(s===l.SelectionMode.None){return this;}var B=this.getBinding("rows");if(B&&B.findNode&&B.addSelectionInterval){if(s===l.SelectionMode.Single){B.setSelectionInterval(f,f);}else{B.addSelectionInterval(f,t);}}else{T.prototype.addSelectionInterval.call(this,f,t);}return this;};d.prototype.removeSelectionInterval=function(f,t){var B=this.getBinding("rows");if(B&&B.findNode&&B.removeSelectionInterval){B.removeSelectionInterval(f,t);}else{T.prototype.removeSelectionInterval.call(this,f,t);}return this;};d.prototype.selectAll=function(){if(!b.hasSelectAll(this)){return this;}var B=this.getBinding("rows");if(B&&B.selectAll){B.selectAll();}else{T.prototype.selectAll.call(this);}return this;};d.prototype.getSelectedIndex=function(){var B=this.getBinding("rows");if(B&&B.findNode){return B.getSelectedIndex();}else{return T.prototype.getSelectedIndex.call(this);}};d.prototype.clearSelection=function(){var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();}else{T.prototype.clearSelection.call(this);}return this;};d.prototype.getContextByIndex=function(r){var B=this.getBinding("rows");if(B){return B.getContextByIndex(r);}};d.prototype.setRootLevel=function(r){this.setFirstVisibleRow(0);var B=this.getBinding("rows");if(B){c(B.setRootLevel,"rootLevel is not supported by the used binding");if(B.setRootLevel){B.setRootLevel(r);}}this.setProperty("rootLevel",r,true);return this;};d.prototype.setCollapseRecursive=function(e){var B=this.getBinding("rows");if(B){c(B.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(B.setCollapseRecursive){B.setCollapseRecursive(e);}}this.setProperty("collapseRecursive",!!e,true);return this;};d.prototype._getSelectedIndicesCount=function(){var s;var B=this.getBinding("rows");if(B&&B.getSelectedNodesCount){return B.getSelectedNodesCount();}else{return T.prototype.getSelectedIndices.call(this);}return s;};d.prototype.setUseGroupMode=function(g){this.setProperty("useGroupMode",!!g);if(!!g){b.Grouping.setGroupMode(this);}else{b.Grouping.setTreeMode(this);}return this;};d.prototype.setEnableGrouping=function(){L.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");return this;};d.prototype.setGroupBy=function(){L.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");return this;};d.prototype.setUseFlatMode=function(f){f=!!f;if(f!=this._bFlatMode){this._bFlatMode=f;if(this.getDomRef()&&b.Grouping.isTreeMode(this)){this.invalidate();}}return this;};return d;});
