/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/TreeBinding','./v2/ODataTreeBinding','sap/ui/model/TreeBindingAdapter','sap/ui/model/TreeAutoExpandMode','sap/ui/model/ChangeReason','./OperationMode','sap/base/assert','sap/ui/model/Filter','sap/ui/model/odata/ODataUtils'],function(T,O,a,b,C,c,d,F,e){"use strict";var f=function(){if(!(this instanceof T)||this._bIsAdapted){return;}a.apply(this);for(var g in f.prototype){if(f.prototype.hasOwnProperty(g)){this[g]=f.prototype[g];}}this.mParameters=this.mParameters||{};this._aRowIndexMap=[];this._iThreshold=0;this._iPageSize=0;this.setAutoExpandMode(this.mParameters.autoExpandMode||b.Sequential);if(this.mParameters.collapseRecursive===undefined){this.bCollapseRecursive=true;}else{this.bCollapseRecursive=!!this.mParameters.collapseRecursive;}this._createTreeState();if(this.mParameters.treeState&&this.sOperationMode==c.Client){this.setTreeState(this.mParameters.treeState);}};f.prototype.nodeHasChildren=function(n){d(n,"ODataTreeBindingAdapter.nodeHasChildren: No node given!");if(!n){return false;}else if(n.isArtificial){return true;}else{return O.prototype.hasChildren.call(this,n.context);}};f.prototype._calculateGroupID=function(n){var g="";var G="";var E;if(n.context===null){return"/";}if(n.parent){g=n.parent.groupID;g=g[g.length-1]!=="/"?g+"/":g;if(this.bHasTreeAnnotations){E=(n.context.getProperty(this.oTreeProperties["hierarchy-node-for"])+"").replace(/\//g,"%2F");G=E+"/";}else{G=n.context.sPath.substring(1)+"/";}}else{if(this.bHasTreeAnnotations){g="/";E=(n.context.getProperty(this.oTreeProperties["hierarchy-node-for"])+"").replace(/\//g,"%2F");G=E+"/";}else{g="/";G=n.context.sPath[0]==="/"?n.context.sPath.substring(1):n.context.sPath;}}var s=g+G;return s;};f.prototype.resetData=function(o,p){var r=O.prototype.resetData.call(this,o,p);this._aRowIndexMap=[];this._oRootNode=undefined;this._iPageSize=0;this._iThreshold=0;if(!p||p.reason!==C.Sort){this.clearSelection();this._createTreeState(true);}return r;};f.prototype.expandNodeToLevel=function(i,l,s){if(this.sOperationMode!=="Server"){return Promise.reject(new Error("expandNodeToLevel() does not support binding operation modes other than OperationMode.Server"));}var n=this.findNode(i),p=[],A="";if(this.sOperationMode=="Server"||this.bUseServersideApplicationFilters){A=this.getFilterParams();}var N=n.context.getProperty(this.oTreeProperties["hierarchy-node-for"]);var E=this._getEntityType();var g=e._createFilterParams(new F(this.oTreeProperties["hierarchy-node-for"],"EQ",N),this.oModel.oMetadata,E);var L=this._getLevelFilterParams("LE",l);p.push("$filter="+g+"%20and%20"+L+(A?"%20and%20"+A:""));if(this.sCustomParams){p.push(this.sCustomParams);}return this._loadSubTree(n,p).then(function(D){this._expandSubTree(n,D.results);if(!s){this._fireChange({reason:C.Expand});}}.bind(this));};f.prototype._expandSubTree=function(p,D){this._updateTreeState({groupID:p.groupID,expanded:true});var P,s,n,m={},i;n=p.context.getProperty(this.oTreeProperties["hierarchy-node-for"]);m[n]=p.groupID;for(i=1;i<D.length;i++){var I,k,g,E,o;E=D[i];I=E[this.oTreeProperties["hierarchy-node-for"]];P=E[this.oTreeProperties["hierarchy-parent-node-for"]];if(E[this.oTreeProperties["hierarchy-drill-state-for"]]==="leaf"){continue;}k=this.oModel._getKey(E);o=this.oModel.getContext("/"+k);s=m[P];g=this._calculateGroupID({parent:{groupID:s},context:o});m[I]=g;this._updateTreeState({groupID:g,expanded:true});}};return f;},true);
