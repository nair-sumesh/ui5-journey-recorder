/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/util/ObjectPath','sap/ui/base/EventProvider','sap/ui/base/ManagedObject','sap/ui/core/mvc/ControllerMetadata','sap/ui/core/mvc/ControllerExtension','sap/ui/core/mvc/OverrideExecution',"sap/base/Log","sap/ui/thirdparty/jquery"],function(O,E,M,C,a,b,L,q){"use strict";var r={};var e={};var c=E.extend("sap.ui.core.mvc.Controller",{metadata:{stereotype:"controller",methods:{"byId":{"public":true,"final":true},"getView":{"public":true,"final":true},"getInterface":{"public":false,"final":true},"onInit":{"public":false,"final":false,"overrideExecution":b.After},"onExit":{"public":false,"final":false,"overrideExecution":b.Before},"onBeforeRendering":{"public":false,"final":false,"overrideExecution":b.Before},"onAfterRendering":{"public":false,"final":false,"overrideExecution":b.After}}},constructor:function(n){var t=null;if(typeof(n)=="string"){if(!r[n]){L.warning("Do not call sap.ui.core.mvc.Controller constructor for non typed scenario!");}t=r[n];}E.apply(this,arguments);if(t){q.extend(this,r[n]);}if(this.extension){throw new Error("The keyword 'extension' cannot be used as a member of a controller");}this["_sapui_Extensions"]={};c.extendByMember(this,false);this._sapui_isExtended=false;},_isExtended:function(){return this._sapui_isExtended;},getInterface:function(){var i={};var o=this.getMetadata();var p=o.getAllPublicMethods();p.forEach(function(s){var F=this[s];if(typeof F==='function'){i[s]=function(){var t=F.apply(this,arguments);return(t instanceof c)?t.getInterface():t;}.bind(this);}}.bind(this));this.getInterface=function(){return i;};return i;}},C);function d(o,i,l){var n=i.getMetadata().getName();var k=o.getMetadata();var p=o["_sapui_Extensions"];var I=o.getInterface();var s=a.getMetadata().getLifecycleConfiguration();var t={namespace:n,extension:i,reloadNeeded:false};i._setController(I);if(i.getMetadata().hasOverrides()){var u,v,w,x,y=i.getMetadata().getOverrides(),S=i.getMetadata().getStaticOverrides();for(x in S){w=i.getMetadata();if(!w.isMethodFinal(x)){a.overrideMethod(x,i,S,i,w.getOverrideExecution(x));}else{L.error("Method '"+x+"' of extension '"+n+"' is flagged final and cannot be overridden by calling 'override'");}}for(x in y){if(x!=='extension'){if(x in i.base){L.debug("Overriding  member '"+x+"' of original controller.");var z=y[x];var A=o[x];if(typeof A=="object"&&typeof z=="object"){v=p[x];w=v.extension.getMetadata();for(u in z){if(!w.isMethodFinal(u)){a.overrideMethod(u,A,z,i,w.getOverrideExecution(u));}else{L.error("Method '"+u+"' of extension '"+v.namespace+"' is flagged final and cannot be overridden by extension '"+n+"'");}}}else if(!k.isMethodFinal(x)){a.overrideMethod(x,o,y,i,k.getOverrideExecution(x));}else{L.error("Method '"+x+"' of controller '"+o.getMetadata().getName()+"' is flagged final and cannot be overridden by extension '"+n+"'");}}else if(x in s){a.overrideMethod(x,o,y,i,k.getOverrideExecution(x));}else{L.error("Method '"+u+"' of extension '"+v.namespace+" does not exist in controller "+o.getMetadata().getName()+" and cannot be overridden");}}if(y.extension){for(var B in y.extension){w=p[B].extension.getMetadata();var D=O.create(B,o.extension);var F=p[B].extension;var G=y.extension[B];for(u in G){if(!w.isMethodFinal(u)){a.overrideMethod(u,D,G,i,w.getOverrideExecution(u));a.overrideMethod(u,F,G,i,w.getOverrideExecution(u));}else{L.error("Method '"+u+"' of extension '"+B+"' is flagged final and cannot be overridden by extension '"+n+"'");}}}}t.reloadNeeded=true;}}var H=i.getInterface();if(l){p[l]=t;t.location=l;o[l]=H;I[l]=H;}else{p[n]=t;t.location="extension."+n;O.set("extension."+n,H,o);O.set("extension."+n,H,I);}}function m(o,i,l){if(i instanceof a){d(o,i,l);}else if(i.getMetadata&&i.getMetadata().getStereotype()=="controllerextension"){var k=new i();d(o,k,l);}else{var n=a.getMetadata().getLifecycleConfiguration();for(var s in i){if(s in n){a.overrideMethod(s,o,i,o,n[s].overrideExecution);}else{a.overrideMethod(s,o,i);}}}}function f(n,A){if(!n){throw new Error("Controller name ('sName' parameter) is required");}var s=n.replace(/\./g,"/")+".controller",i=k(sap.ui.require(s));function k(i){if(i){return i;}else if(r[n]){return c;}else{return O.get(n);}}if(A){return new Promise(function(l,o){if(!i){sap.ui.require([s],function(i){l(k(i));});}else{l(i);}});}else if(!i){i=sap.ui.requireSync(s);return k(i);}else{return i;}}function g(o,A){var p=c._sExtensionProvider.replace(/\./g,"/"),P=e[p];if(A){return new Promise(function(k,l){if(p){if(P){k(P);}else{sap.ui.require([p],function(i){P=new i();e[p]=P;k(P);});}}else{k();}});}else if(p){if(P){return P;}else{var i=sap.ui.requireSync(p);P=new i();e[p]=P;return P;}}}function h(i,n){var o;if(r[n]){o=new i(n);}else{o=new i();}if(!o){throw new Error("Controller "+n+" couldn't be instantiated");}return o;}c.extendByMember=function(o,A){var s;for(s in o){if(o[s]&&o[s].getMetadata&&o[s].getMetadata().getStereotype()=="controllerextension"){o[s]=new o[s]();}}for(s in o){if(o[s]&&o[s].getMetadata&&o[s].getMetadata().getStereotype()=="controllerextension"){m(o,o[s],s);}}if(A){return Promise.resolve(o);}else{return o;}};c.extendByCustomizing=function(o,n,A){var k=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(!k){return A?Promise.resolve(o):o;}function p(y,o){return f(y,A).then(function(s){if((s=r[y])!==undefined){m(o,s);return o;}},function(z){L.error("Attempt to load Extension Controller "+y+" was not successful - is the Controller correctly defined in its file?");});}var s,t=[],u,v=A?Promise.resolve(o):o,w=k.getControllerExtension(n,M._sOwnerId);if(w){u=typeof w==="string"?w:w.controllerName;t=w.controllerNames||[];if(u){t.unshift(u);}}for(var i=0,l=t.length;i<l;i++){var x=t[i];if(typeof x==="string"){L.info("Customizing: Controller '"+n+"' is now extended by '"+x+"'");if(A){v=v.then(p.bind(null,x,o));}else{if(!r[x]&&!sap.ui.require(x)){f(x);}if((s=r[x])!==undefined){m(o,s);}else{L.error("Attempt to load Extension Controller "+x+" was not successful - is the Controller correctly defined in its file?");}}}}return v;};c.extendByProvider=function(o,n,s,A){if(!c._sExtensionProvider){return A?Promise.resolve(o):o;}L.info("Customizing: Controller '"+n+"' is now extended by Controller Extension Provider '"+c._sExtensionProvider+"'");var k,p;if(A){return g(o,A).then(function(p){return p.getControllerExtensions(n,s,A);}).then(function(t){if(t&&t.length){for(var i=0,l=t.length;i<l;i++){m(o,t[i]);}}return o;},function(t){L.error("Controller Extension Provider: Error '"+t+"' thrown in "+c._sExtensionProvider+"extension provider ignored.");return o;});}else{p=g(o,A);k=p.getControllerExtensions(n,s,A);if(k&&Array.isArray(k)){for(var i=0,l=k.length;i<l;i++){m(o,k[i]);}}else{L.error("Controller Extension Provider: Error in ExtensionProvider.getControllerExtensions: "+c._sExtensionProvider+" - no valid extensions returned");}}return o;};c.create=function(o){return j(o.name,undefined,true);};sap.ui.controller=function(n,o,A){if(A){L.info("Do not use deprecated factory function 'sap.ui.controller("+n+")'. Use 'sap.ui.core.mvc.Controller.create(...)' instead.","sap.ui.controller",null,function(){return{type:"sap.ui.controller",name:n};});}else{L.warning("Do not use synchronous controller creation for controller '"+n+"'! Use the new asynchronous factory 'sap.ui.core.mvc.Controller.create(...)' instead.","sap.ui.controller",null,function(){return{type:"sap.ui.controller",name:n};});}return j.apply(this,arguments);};function j(n,o,A){var i,k,s=M._sOwnerId;if(typeof o==="boolean"){o=undefined;}if(!o){if(A){return f(n,A).then(function(k){return h(k,n);}).then(function(i){return c.extendByCustomizing(i,n,A);}).then(function(i){return c.extendByProvider(i,n,s,A);}).then(function(i){i._sapui_isExtended=true;return i;});}else{k=f(n,A);i=h(k,n);i=c.extendByCustomizing(i,n,A);i=c.extendByProvider(i,n,s,A);i._sapui_isExtended=true;}return i;}else{r[n]=o;L.info("For defining controllers use Controller.extend instead");}}c.prototype.getPublicMethods=function(){var p={},o=this.getMetadata(),i=o.getAllMethods(),l=o.getLifecycleConfiguration();Object.keys(i).forEach(function(s){if(o.isMethodPublic(s)){p[s]=i[s];p[s].reloadNeeded=!!(s in l);}});delete p.extension;var k=this["_sapui_Extensions"];Object.keys(k).forEach(function(n){var s=k[n];var t=s.extension.getInterface();var A=s.extension.getMetadata().getAllMethods();Object.keys(t).forEach(function(u){delete p[s.location];var v=q.extend({},A[u],{reloadNeeded:s.reloadNeeded});p[s.location+"."+u]=v;});});return p;};c.prototype.destroy=function(){Object.keys(this["_sapui_Extensions"]).forEach(function(o){O.set(o.location,null,this);}.bind(this));delete this["_sapui_Extensions"];delete this["_sapui_Interface"];E.prototype.destroy.apply(this,arguments);};c.prototype.getView=function(){return this.oView;};c.prototype.byId=function(i){return this.oView?this.oView.byId(i):undefined;};c.prototype.createId=function(i){return this.oView?this.oView.createId(i):undefined;};c.prototype.getOwnerComponent=function(){var i=sap.ui.requireSync("sap/ui/core/Component");return i.getOwnerComponentFor(this.getView());};c.prototype.connectToView=function(v){this.oView=v;if(this.onInit){v.attachAfterInit(this.onInit,this);}if(this.onExit){v.attachBeforeExit(this.onExit,this);}if(this.onAfterRendering){v.attachAfterRendering(this.onAfterRendering,this);}if(this.onBeforeRendering){v.attachBeforeRendering(this.onBeforeRendering,this);}};c._sExtensionProvider=null;c.registerExtensionProvider=function(s){c._sExtensionProvider=s;};return c;});
