/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./View',"./XMLViewRenderer","sap/base/util/merge",'sap/ui/base/ManagedObject','sap/ui/core/XMLTemplateProcessor','sap/ui/core/library','sap/ui/core/Control','sap/ui/core/RenderManager','sap/ui/core/cache/CacheManager','sap/ui/model/resource/ResourceModel','sap/ui/util/XMLHelper','sap/base/strings/hash','sap/base/Log','sap/base/util/LoaderExtensions'],function(q,V,X,m,M,a,l,C,R,b,c,d,h,L,f){"use strict";var g=R.RenderPrefixes,j=l.mvc.ViewType,x="XMLViewCacheError",n={};var k=V.extend("sap.ui.core.mvc.XMLView",{metadata:{library:"sap.ui.core",specialSettings:{containingView:{type:'sap.ui.core.mvc.XMLView',visibility:'hidden'},xmlNode:{type:'Element',visibility:'hidden'},cache:'Object',processingMode:{type:"string",defaultValue:"",visibility:"hidden"}},designtime:"sap/ui/core/designtime/mvc/XMLView.designtime"}});sap.ui.xmlview=function(i,e){return sap.ui.view(i,e,j.XML);};k.create=function(o){var P=m({},o);P.viewContent=P.definition;P.async=true;P.type=j.XML;P.processingMode=P.processingMode||"sequential";return V.create(P);};k._sType=j.XML;k.asyncSupport=true;k._bUseCache=sap.ui.getCore().getConfiguration().getViewCache()&&b._isSupportedEnvironment();function v(e){if(e.parseError.errorCode!==0){var P=e.parseError;throw new Error("The following problem occurred: XML parse Error for "+P.url+" code: "+P.errorCode+" reason: "+P.reason+" src: "+P.srcText+" line: "+P.line+" linepos: "+P.linepos+" filepos: "+P.filepos);}}function p(o,S){if(!S){throw new Error("mSettings must be given");}else if(S.viewName&&S.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.");}else if((S.viewName||S.viewContent)&&S.xmlNode){throw new Error("View name/content AND an XML node are given. There is no point in doing this, so please decide.");}else if(!(S.viewName||S.viewContent)&&!S.xmlNode){throw new Error("Neither view name/content nor an XML node is given. One of them is required.");}else if(S.cache&&!(S.cache.keys&&S.cache.keys.length)){throw new Error("No cache keys provided. At least one is required.");}}function r(o,S){o.mProperties["viewContent"]=S.viewContent;var e=d.parse(S.viewContent);v(e);return e.documentElement;}function s(o,S){if((o._resourceBundleName||o._resourceBundleUrl)&&(!S.models||!S.models[o._resourceBundleAlias])){var e=new c({bundleName:o._resourceBundleName,bundleUrl:o._resourceBundleUrl,bundleLocale:o._resourceBundleLocale});o.setModel(e,o._resourceBundleAlias);}}function t(o){o.oAfterRenderingNotifier=new G();o.oAfterRenderingNotifier.addDelegate({onAfterRendering:function(){o.onAfterRenderingBeforeChildren();}});}function u(S){var e=sap.ui.require("sap/ui/core/Component"),o;while(S&&e){var i=e.getOwnerComponentFor(S);if(i){S=o=i;}else{if(S instanceof e){o=S;}S=S.getParent&&S.getParent();}}return o;}function w(o,e){var i=u(o),H=i?JSON.stringify(i.getManifest()):null,I=[];I=I.concat(A(o,i),D(),B(o),e.keys);return z(o,I).then(function(K){return{key:K+"("+h(H||"")+")",componentManifest:H,additionalData:e.additionalData};});}function y(K){return K;}function z(o,i){return Promise.all(i).then(function(K){K=K.filter(function(H){return H!==n;});if(K.every(y)){return K.join('_');}else{var e=new Error("Provided cache keys may not be empty or undefined.");e.name=x;return Promise.reject(e);}});}function A(o,e){var i=e&&e.getMetadata().getName();return[i||window.location.host+window.location.pathname,o.getId(),sap.ui.getCore().getConfiguration().getLanguageTag()];}function B(e){var P=e.getPreprocessors(),i=e.getPreprocessorInfo(false),H=[];function I(o){H.push(o.preprocessor.then(function(J){if(J.getCacheKey){return J.getCacheKey(i);}else{return n;}}));}for(var T in P){P[T].forEach(I);}return H;}function D(){return sap.ui.getVersionInfo({async:true}).then(function(i){var T="";if(!i.libraries){T=sap.ui.buildinfo.buildtime;}else{i.libraries.forEach(function(o){T+=o.buildTimestamp;});}return T;}).catch(function(e){L.warning("sap.ui.getVersionInfo could not be retrieved","sap.ui.core.mvc.XMLView");L.debug(e);return"";});}function E(e,i){var K=e.key;delete e.key;e.xml=d.serialize(i);return b.set(K,e);}function F(e){return b.get(e.key).then(function(i){if(i&&i.componentManifest==e.componentManifest){i.xml=d.parse(i.xml,"application/xml").documentElement;if(i.additionalData){q.extend(true,e.additionalData,i.additionalData);}return i;}});}k.prototype.initViewSettings=function(S){var e=this,_;function i(O){e._xContent=O;if(V._supportInfo){V._supportInfo({context:e._xContent,env:{caller:"view",viewinfo:q.extend(true,{},e),settings:q.extend(true,{},S||{}),type:"xmlview"}});}if(!e.isSubView()){var P={};a.parseViewAttributes(O,e,P);if(!S.async){Object.assign(S,P);}else{e.applySettings(P);}}else{delete S.controller;}s(e,S);t(e);}function o(O,P){if(e.hasPreprocessor("viewxml")){return a.enrichTemplateIdsPromise(O,e,P).then(function(){return e.runPreprocessor("viewxml",O,!P);});}return O;}function H(O){return e.runPreprocessor("xml",O).then(function(O){return o(O,true);});}function I(N){return f.loadResource(N,{async:true}).then(function(O){return O.documentElement;});}function J(N,O){return I(N).then(H).then(function(P){if(O){E(O,P);}return P;});}function K(N,O){return w(e,O).then(function(P){return F(P).then(function(Q){if(!Q){return J(N,P);}else{return Q.xml;}});}).catch(function(P){if(P.name===x){L.debug(P.message,P.name,"sap.ui.core.mvc.XMLView");L.debug("Processing the View without caching.","sap.ui.core.mvc.XMLView");return J(N);}else{return Promise.reject(P);}});}this._oContainingView=S.containingView||this;this._sProcessingMode=S.processingMode;if(this.oAsyncState){this.oAsyncState.suppressPreserve=true;}p(this,S);if(S.viewName){var N=S.viewName.replace(/\./g,"/")+".view.xml";if(S.async){if(S.cache&&k._bUseCache){return K(N,S.cache).then(i);}else{return I(N).then(H).then(i);}}else{_=f.loadResource(N).documentElement;}}else if(S.viewContent){if(S.viewContent.nodeType===window.Node.DOCUMENT_NODE){_=S.viewContent.documentElement;}else{_=r(this,S);}}else if(S.xmlNode){_=S.xmlNode;}if(S.async){return H(_).then(i);}else{_=this.runPreprocessor("xml",_,true);_=o(_,false);if(_&&typeof _.getResult==='function'){if(_.isRejected()){throw _.getResult();}_=_.getResult();}i(_);}};k.prototype.exit=function(){if(this.oAfterRenderingNotifier){this.oAfterRenderingNotifier.destroy();}V.prototype.exit.apply(this,arguments);};k.prototype.onControllerConnected=function(o){var e=this;function i(H){return M.runWithPreprocessors(H,{settings:e._fnSettingsPreprocessor});}if(!this.oAsyncState){this._aParsedContent=i(a.parseTemplate.bind(null,this._xContent,this));}else{return a.parseTemplatePromise(this._xContent,this,true,{fnRunWithPreprocessor:i}).then(function(P){e._aParsedContent=P;delete e.oAsyncState.suppressPreserve;});}};k.prototype.getControllerName=function(){return this._controllerName;};k.prototype.isSubView=function(){return this._oContainingView!=this;};k.prototype.onAfterRenderingBeforeChildren=function(){if(this._$oldContent.length!==0){var e=this.getAggregation("content");if(e){for(var i=0;i<e.length;i++){var N=document.getElementById(g.Temporary+e[i].getId())||e[i].getDomRef()||document.getElementById(g.Invisible+e[i].getId());if(N){q(document.getElementById(g.Dummy+e[i].getId())).replaceWith(N);}}}q(document.getElementById(g.Temporary+this.getId())).replaceWith(this._$oldContent);}this._$oldContent=undefined;};k.prototype._onChildRerenderedEmpty=function(o,e){q(e).replaceWith('<div id="'+g.Dummy+o.getId()+'" class="sapUiHidden"/>');return true;};k.prototype.destroy=function(S){var $=R.findPreservedContent(this.getId());if($){$.remove();}if(S=="KeepDom"&&this.getDomRef()){this.getDomRef().removeAttribute("data-sap-ui-preserve");}V.prototype.destroy.call(this,S);};k.registerPreprocessor=function(T,P,S,o,e){T=T.toUpperCase();if(k.PreprocessorType[T]){V.registerPreprocessor(k.PreprocessorType[T],P,this.getMetadata().getClass()._sType,S,o,e);}else{L.error("Preprocessor could not be registered due to unknown sType \""+T+"\"",this.getMetadata().getName());}};k.PreprocessorType={XML:"xml",VIEWXML:"viewxml",CONTROLS:"controls"};var G=C.extend("sap.ui.core.mvc.XMLAfterRenderingNotifier",{metadata:{library:"sap.ui.core"},renderer:function(o,e){o.write("");}});k.registerPreprocessor("xml","sap.ui.core.util.XMLPreprocessor",true,true);return k;});