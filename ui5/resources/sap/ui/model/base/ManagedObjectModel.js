/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['../json/JSONModel','../json/JSONPropertyBinding','../json/JSONListBinding','sap/ui/base/ManagedObject','sap/ui/base/ManagedObjectObserver','../Context','../ChangeReason',"sap/base/util/uid","sap/base/Log","sap/base/util/isPlainObject"],function(J,a,b,M,c,C,d,u,L,e){"use strict";var f=b.extend("sap.ui.model.base.ManagedObjectModelAggregationBinding"),g=a.extend("sap.ui.model.base.ManagedObjectModelPropertyBinding"),h="@custom",I="--";var j=J.extend("sap.ui.model.base.ManagedObjectModel",{constructor:function(o,D){if(!D&&typeof D!="object"){D={};}D[h]={};this._oObject=o;this._mObservedCount={properties:{},aggregations:{}};this.mListBinding={};J.apply(this,[D]);this._oObserver=new c(this.observerChanges.bind(this));}});j.prototype.getAggregation=J.prototype.getProperty;j.prototype.setData=function(D,m){var _={};_[h]=D;J.prototype.setData.apply(this,[_,m]);};j.prototype.getJSON=function(){return JSON.stringify(this.oData[h]);};j.prototype.setProperty=function(p,v,o,A){var r=this.resolve(p,o),l,O,P;if(!r){return false;}if(r.indexOf("/"+h)===0){return J.prototype.setProperty.apply(this,arguments);}l=r.lastIndexOf("/");O=r.substring(0,l||1);P=r.substr(l+1);var i=this._getObject(O);if(i){if(i instanceof M){var k=i.getMetadata().getProperty(P);if(k){var s=k._sMutator,G=k._sGetter;if(i[G]()!==v){i[s](v);this.checkUpdate(false,A);return true;}}else{L.warning("The setProperty method only supports properties, the path "+r+" does not point to a property",null,"sap.ui.model.base.ManagedObjectModel");}}else if(i[P]!==v){i[P]=v;this.checkUpdate(false,A);return true;}}return false;};j.prototype.addBinding=function(B){J.prototype.addBinding.apply(this,arguments);if(B instanceof f){var A=B.sPath.replace("/","");this.mListBinding[A]=B;}B.checkUpdate(false);};j.prototype.removeBinding=function(B){J.prototype.removeBinding.apply(this,arguments);if(B instanceof f){var A=B.sPath.replace("/","");delete this.mListBinding[A];}this._observeBeforeEvaluating(B,false);};j.prototype.firePropertyChange=function(A){if(A.reason===d.Binding){A.resolvedPath=this.resolve(A.path,A.context);}J.prototype.firePropertyChange.call(this,A);};j.prototype.bindAggregation=function(p,o,P){return J.prototype.bindProperty.apply(this,arguments);};j.prototype.bindProperty=function(p,o,P){var B=new g(this,p,o,P);return B;};j.prototype.bindList=function(p,o,s,F,P){var B=new f(this,p,o,s,F,P);B.enableExtendedChangeDetection();return B;};j.prototype.getManagedObject=function(p,o){if(p instanceof C){o=p;p=o.getPath();}var O=this.getProperty(p,o);if(O instanceof M){return O;}return null;};j.prototype.getRootObject=function(){return this._oObject;};j.prototype._observePropertyChange=function(o,p){if(!o||!p){return;}var k=o.getId()+"/@"+p.name;if(!this._oObserver.isObserved(o,{properties:[p.name]})){this._oObserver.observe(o,{properties:[p.name]});this._mObservedCount.properties[k]=1;}else{this._mObservedCount.properties[k]++;}};j.prototype._unobservePropertyChange=function(o,p){if(!o||!p){return;}var k=o.getId()+"/@"+p.name;this._mObservedCount.properties[k]--;if(this._mObservedCount.properties[k]==0){this._oObserver.unobserve(o,{properties:[p.name]});delete this._mObservedCount.properties[k];}};j.prototype._observeAggregationChange=function(o,A){if(!o||!A){return;}var k=o.getId()+"/@"+A.name;if(!this._oObserver.isObserved(o,{aggregations:[A.name]})){this._oObserver.observe(o,{aggregations:[A.name]});this._mObservedCount.aggregations[k]=1;}else{this._mObservedCount.aggregations[k]++;}};j.prototype._unobserveAggregationChange=function(o,A){if(!o||!A){return;}var k=o.getId()+"/@"+A.name;this._mObservedCount.aggregations[k]--;if(this._mObservedCount.aggregations[k]==0){this._oObserver.unobserve(o,{aggregations:[A.name]});delete this._mObservedCount.aggregations[k];}};j.prototype._createId=function(i){var o=this._oObject;if(typeof o.createId==="function"){return o.createId(i);}if(!i){return o.getId()+I+u();}if(i.indexOf(o.getId()+I)!=0){return o.getId()+I+i;}return i;};j.prototype._getSpecialNode=function(n,s,p,P){if(n instanceof M){if(s==="className"){if(n.getMetadata){return n.getMetadata().getName();}else{return typeof n;}}else if(s==="id"){return n.getId();}else if(s==="metadataContexts"){return n._oProviderData;}}else if(s==="binding"&&p&&P){return p.getBinding(P);}else if(s==="bound"&&p&&P){return p.isBound(P);}else if(s==="bindingInfo"&&p&&P){return p.getBindingInfo(P);}else if(Array.isArray(n)){if(s==="length"){return n.length;}else if(s.indexOf("id=")===0){var k=s.substring(3),F=null;for(var i=0;i<n.length;i++){if(n[i].getId()===this._createId(k)||n[i].getId()===k){F=n[i];break;}}return F;}}return null;};j.prototype._getObject=function(p,o){var n=this._oObject,r="",t=this;this.aBindings.forEach(function(B){if(!B._bAttached){t._observeBeforeEvaluating(B,true);}});if(typeof p==="string"&&p.indexOf("/")!=0&&!o){return null;}if(o instanceof M){n=o;r=p;}else if(!o||o instanceof C){r=this.resolve(p,o);if(!r){return n;}if(r.indexOf("/"+h)===0){return J.prototype._getObject.apply(this,[p,o]);}}else{n=o;r=p;}if(!n){return null;}var P=r.split("/"),i=0;if(!P[0]){i++;}var k=null,s=null,l;while(n!==null&&P[i]){l=P[i];if(l=="id"){l="@id";}if(l.indexOf("@")===0){n=this._getSpecialNode(n,l.substring(1),k,s);}else if(n instanceof M){var N=n.getMetadata();if(N.isInstanceOf("sap.ui.core.IDScope")&&l.indexOf("#")===0){n=n.byId(l.substring(1));}else{k=n;s=l;var m=N.getProperty(l);if(m){n=n[m._sGetter]();}else{var A=N.getAggregation(l)||N.getAllPrivateAggregations()[l];if(A){n=n[A._sGetter]?n[A._sGetter]():n.getAggregation(l);}else{if(n&&n[l]&&typeof n[l]==="function"){n=n[l]();}else{n=null;}}}}}else if(Array.isArray(n)||e(n)){n=n[l];}else{if(n&&n[l]&&typeof n[l]==="function"){n=n[l]();}else{n=null;}}i++;}return n;};j.prototype.destroy=function(){for(var n in this._mAggregationObjects){var o=this._mAggregationObjects[n];if(o.object.invalidate.fn){o.object.invalidate=o.object.invalidate.fn;}}J.prototype.destroy.apply(this,arguments);};j.prototype._observeBeforeEvaluating=function(B,o){if(!B.isResolved()){return;}var p=B.getPath();var i=B.getContext(),n=this._oObject,r;if(i instanceof M){n=i;r=p;}else if(!i||i instanceof C){r=this.resolve(p,i);if(!r){return;}if(r.indexOf("/"+h)===0){return;}}else{return;}var P=r.split("/");if(!P[0]){P.shift();}var s=P[0];if(n.getMetadata().isInstanceOf("sap.ui.core.IDScope")&&s.indexOf("#")===0){n=n.byId(s.substring(1));s=P[1];}if(n instanceof M){var N=n.getMetadata(),k=N.getProperty(s);if(k){if(o===true){this._observePropertyChange(n,k);}else if(o===false){this._unobservePropertyChange(n,k);}}else{var A=N.getAggregation(s)||N.getAllPrivateAggregations()[s];if(A){if(o===true){this._observeAggregationChange(n,A);}else if(o===false){this._unobserveAggregationChange(n,A);}}}B._bAttached=o;}};j.prototype.observerChanges=function(o){if(o.type=="aggregation"){if(o.mutation=="insert"){this._oObserver.observe(o.child,{properties:true,aggegations:true});if(this.mListBinding[o.name]){var l=this._oObject.getBinding(o.name);var A=this._oObject.getAggregation(o.name);if(l&&l.getLength()!=A.length){return;}}}else{this._oObserver.unobserve(o.child,{properties:true,aggegations:true});}}this.checkUpdate();};return j;});
