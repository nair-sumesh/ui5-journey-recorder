/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var x=function(){(function(){var s=false,p=false;var _=Promise.prototype.then,a=Promise.prototype.catch,b=window.setTimeout,c=window.setInterval,q=[];function d(h){if(!p){p=true;b(function(){var C=q;q=[];p=false;C.forEach(function(Q){Q();});},0);}q.push(h);}function w(h,S,C){if(typeof h!=="function"){return h;}return function(){var A=Array.prototype.slice.call(arguments);if(s||p){return new Promise(function(r,f){d(function(){var R;try{R=h.apply(window,A);r(R);}catch(E){f(E);}});});}return h.apply(window,A);};}Promise.prototype.then=function(t,C){var W=w(t),f=w(C);return _.call(this,W,f);};Promise.prototype.catch=function(C){var W=w(C);return a.call(this,W);};function e(h){var W=function(){var A;if(p){A=[W,0].concat(arguments);b.apply(window,A);}else{h.apply(window,arguments);}};return W;}window.setTimeout=function(h){var A=Array.prototype.slice.call(arguments),H=typeof h==="string"?new Function(h):h,W=e(H);A[0]=W;return b.apply(window,A);};window.setInterval=function(h){var A=Array.prototype.slice.call(arguments),H=typeof h==="string"?new Function(h):h,W=e(H,true);A[0]=W;return c.apply(window,A);};window.XMLHttpRequest=new Proxy(window.XMLHttpRequest,{construct:function(t,A,n){var X=new t(),S=false,D=false,r=0,P;function f(h){var W=function(E){var C=X.readyState;function i(){r=C;if(W.active){return h.call(P,E);}}if(!S&&s){D=true;}if(D){b(i,0);return true;}return i();};h.wrappedHandler=W;W.active=true;return W;}function u(h){return g(h.wrappedHandler);}function g(W){if(typeof W==="function"){W.active=false;}return W;}P=new Proxy(X,{get:function(T,h,R){var v=T[h];switch(h){case"readyState":return r;case"addEventListener":return function(N,H,C){v.call(T,N,f(H),C);};case"removeEventListener":return function(N,H,C){v.call(T,N,u(H),C);};case"open":return function(m,U,i){S=i===false;v.apply(T,arguments);r=T.readyState;};case"send":return function(){s=S;v.apply(T,arguments);r=T.readyState;s=false;};}if(typeof v==="function"){return function(){return v.apply(T,arguments);};}return v;},set:function(T,h,v){if(h.indexOf("on")===0){g(T[h]);if(typeof v==="function"){T[h]=f(v);return true;}}T[h]=v;return true;}});P.addEventListener("readystatechange",function(){});return P;}});})();};return x;});
