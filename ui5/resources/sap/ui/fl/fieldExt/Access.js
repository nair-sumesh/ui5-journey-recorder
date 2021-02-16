/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/util/Storage","sap/base/security/encodeURLParameters","sap/ui/thirdparty/jquery"],function(S,a,q){"use strict";var A={};A._mServiceType={v2:"v2",v4:"v4"};A._sODataV4ResourcePathPrefix="sap/opu/odata4/";A._sStorageKey="sap.ui.fl.fieldExt.Access";A._iValidityPeriod=1*7*24*60*60*1000;A.getBusinessContexts=function(s,e,E){var m=this._getEntityInfo(e,E);var b=this._parseServiceUri(s);var B=this._buildBusinessContextRetrievalUri(b,m);var p=this._executeAjaxCall(B,b,m);return p;};A.isServiceOutdated=function(s){if(!this._isSystemInfoAvailable()){return false;}var m=this._getServiceItem(this._createServiceItem(s));if(m){if(this._isServiceExpired(m)){this.setServiceValid(s);return false;}else{return true;}}else{return false;}};A.setServiceValid=function(s){if(this._isSystemInfoAvailable()){var d=this._getDataFromLocalStorage();delete d[this._createServiceItem(s).serviceKey];this._setDataToLocalStorage(d);}};A.setServiceInvalid=function(s){if(this._isSystemInfoAvailable()){var d=this._getDataFromLocalStorage();var i=this._createServiceItem(s);d[i.serviceKey]=i;this._setDataToLocalStorage(d);}};A._getEntityInfo=function(e,E){var o={entityTypeName:e||"",entitySetName:E||""};if(((o.entitySetName.length===0)&&(o.entityTypeName.length===0))||(!(o.entitySetName.length===0)&&!(o.entityTypeName.length===0))){throw new Error("sap.ui.fl.fieldExt.Access._getEntityInfo()"+"Inconsistent input parameters EntityType: "+o.entityTypeName+" EntitySet: "+o.entitySetName);}return o;};A._parseServiceUri=function(s){if(s.toLowerCase().indexOf(this._sODataV4ResourcePathPrefix)!==-1){return this._parseV4ServiceUri(s);}else{return this._parseV2ServiceUri(s);}};A._parseV2ServiceUri=function(s){var r=/.*sap\/opu\/odata\/([^\/]+)\/([^\/]+)/i;var R=/([^;]+);v=(\d{1,4})/i;var o="sap/opu/odata";var b;if(s.toLowerCase().indexOf(o)!==-1){var c=s.match(r);if(!c||c.length!==3){throw new Error("sap.ui.fl.fieldExt.Access._parseV2ServiceUri: Malformed service URI (Invalid service name)");}if(c[1].toLowerCase()!=="sap"){b="/"+c[1]+"/"+c[2];}else{b=c[2];}}else{if(s.length>0&&s.lastIndexOf("/")+1===s.length){s=s.substring(0,s.length-1);}b=s.substring(s.lastIndexOf("/")+1);}if(b.indexOf(";v=")!==-1){var v=b.match(R);if(!v||v.length!==3){throw new Error("sap.ui.fl.fieldExt.Access._parseV2ServiceUri: Malformed service URI (Invalid version)");}return{serviceName:v[1],serviceVersion:v[2],serviceType:this._mServiceType.v2};}else{return{serviceName:b,serviceVersion:"0001",serviceType:this._mServiceType.v2};}};A._parseV4ServiceUri=function(s){var r=/^\/?sap\/opu\/odata4((?:\/[^/]+){5})(\/[^/]+){1}(\/.*)?/i;var b=s.match(r);if(!b||b.length!==4){throw new Error("sap.ui.fl.fieldExt.Access._parseV4ServiceUri: Malformed service URI");}var n=b[1].split("/");n.splice(0,3);var R=/(\d{1,4})/i;var v=b[2].match(R);return{serviceName:n.join("/"),serviceVersion:v[1],serviceType:this._mServiceType.v4};};A._buildBusinessContextRetrievalUri=function(s,e){var b="/sap/opu/odata/SAP/APS_CUSTOM_FIELD_MAINTENANCE_SRV/";if(s.serviceType===this._mServiceType.v4){var r=this._sODataV4ResourcePathPrefix+s.serviceName+"/"+s.serviceVersion;b+="GetBusinessContextsByResourcePath?"+a({"ResourcePath":"'"+r+"'"});}else{b+="GetBusinessContextsByEntityType?"+"ServiceName=\'"+s.serviceName+"\'"+"&ServiceVersion=\'"+s.serviceVersion+"\'";}b+="&EntitySetName=\'"+e.entitySetName+"\'"+"&EntityTypeName=\'"+e.entityTypeName+"\'"+"&$format=json";return b;};A._executeAjaxCall=function(b,s,e){var t=this;var m=this._getAjaxSettings();var d=q.Deferred();var r={BusinessContexts:[],ServiceName:s.serviceName,ServiceVersion:s.serviceVersion};q.ajax(b,m).done(function(c,f,j){r.BusinessContexts=t._extractBusinessContexts(c);d.resolve(r);}).fail(function(j,c,f){if(j.status===404&&s.serviceType===t._mServiceType.v4){d.resolve(r);}else{var E=t._getMessagesFromXHR(j);var o={errorOccured:true,errorMessages:E,serviceName:s.serviceName,serviceVersion:s.serviceVersion,entityType:e.entityTypeName,entitySet:e.entitySetName};d.reject(o);}});return d.promise();};A._getAjaxSettings=function(){var s={type:"GET",async:true,dataType:"json"};return s;};A._extractBusinessContexts=function(d){var r=null;var b=[];if(d&&d.d){r=d.d.results;}if(r!==null&&r.length>0){for(var i=0;i<r.length;i++){if(r[i].BusinessContext!==null){b.push(r[i].BusinessContext);}}}return b;};A._getMessagesFromXHR=function(x){var m=[];try{var E=JSON.parse(x.responseText);if(E&&E.error&&E.error.message&&E.error.message.value&&E.error.message.value!==''){m.push({severity:"error",text:E.error.message.value});}else{m.push({severity:"error",text:x.responseText});}}catch(e){}return m;};A._getCurrentTime=function(){return Date.now();};A._isServiceExpired=function(s){return s.expirationDate<=this._getCurrentTime();};A._getLocalStorage=function(){return S.getInstance(S.Type.local);};A.isLocalStorageAvailable=function(){return this._getLocalStorage()&&this._getLocalStorage().isSupported();};A._getServiceItem=function(s){return this._getDataFromLocalStorage()[s.serviceKey]||null;};A._createServiceItem=function(s){var e=this._getCurrentTime()+this._iValidityPeriod;var m=this._getSystemInfo();var p=this._extractServiceInfo(s);return{"serviceKey":m.getName()+m.getClient()+p.serviceName+p.serviceVersion,"expirationDate":e};};A._extractServiceInfo=function(s){if(typeof s==="string"){return this._parseServiceUri(s);}else{return s;}};A._isSystemInfoAvailable=function(){return sap&&sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getLogonSystem;};A._getSystemInfo=function(){return sap.ushell.Container.getLogonSystem();};A._setDataToLocalStorage=function(d){if(this.isLocalStorageAvailable()){this._getLocalStorage().put(A._sStorageKey,JSON.stringify(d));}};A._getDataFromLocalStorage=function(){if(!this.isLocalStorageAvailable()){return{};}var s=this._getLocalStorage().get(A._sStorageKey);if(!s){return{};}else{return JSON.parse(s);}};return A;},true);
