/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/URI',"sap/base/util/JSTokenizer","sap/base/util/deepEqual",'sap/base/strings/escapeRegExp',"sap/base/Log","sap/ui/performance/Measurement"],function(U,J,d,a,L,M){"use strict";
//License granted by Douglas Crockford to SAP, Apache License 2.0
//    (http://www.apache.org/licenses/LICENSE-2.0)
var u=g.bind(null,undefined),D={"Array":Array,"Boolean":Boolean,"Date":Date,"encodeURIComponent":encodeURIComponent,"Infinity":Infinity,"isFinite":isFinite,"isNaN":isNaN,"JSON":JSON,"Math":Math,"NaN":NaN,"Number":Number,"Object":Object,"odata":{"compare":function(){var O;O=sap.ui.requireSync("sap/ui/model/odata/v4/ODataUtils");return O.compare.apply(O,arguments);},"fillUriTemplate":function(e,i){if(!U.expand){sap.ui.requireSync("sap/ui/thirdparty/URITemplate");}return U.expand(e.trim(),i).toString();},"uriEncode":function(){var O;O=sap.ui.requireSync("sap/ui/model/odata/ODataUtils");return O.formatValue.apply(O,arguments);}},"parseFloat":parseFloat,"parseInt":parseInt,"RegExp":RegExp,"String":String,"undefined":undefined},r=/\d/,E="sap.ui.base.ExpressionParser",b=/[a-z_$][a-z0-9_$]*/i,c=/[a-z_$]/i,p=[E],P=E+"#parse",s={"BINDING":{led:o,nud:function(T,e){return B.bind(null,T.value);}},"ERROR":{lbp:Infinity,led:function(T,e,i){n(T.value.message,T.value.text,T.value.at);},nud:function(T,e){n(T.value.message,T.value.text,T.value.at);}},"IDENTIFIER":{led:o,nud:function(T,e){if(!(T.value in e.globals)){L.warning("Unsupported global identifier '"+T.value+"' in expression parser input '"+e.input+"'",undefined,E);}return g.bind(null,e.globals[T.value]);}},"CONSTANT":{led:o,nud:function(T,e){return g.bind(null,T.value);}},".":{lbp:18,led:function(T,e,i){return h.bind(null,i,e.advance("IDENTIFIER").value);},nud:o},"(":{lbp:17,led:function(T,e,i){var v=[],x=true;while(e.current().id!==")"){if(x){x=false;}else{e.advance(",");}v.push(e.expression(0));}e.advance(")");return F.bind(null,i,v);},nud:function(T,e){var v=e.expression(0);e.advance(")");return v;}},"[":{lbp:18,led:function(T,e,i){var N=e.expression(0);e.advance("]");return k.bind(null,i,N);},nud:function(T,e){var i=[],v=true;while(e.current().id!=="]"){if(v){v=false;}else{e.advance(",");}i.push(e.current().id===","?u:e.expression(0));}e.advance("]");return A.bind(null,i);}},"!":{lbp:15,led:o,nud:function(T,e){return l.bind(null,e.expression(this.lbp),function(x){return!x;});}},"typeof":{lbp:15,led:o,nud:function(T,e){return l.bind(null,e.expression(this.lbp),function(x){return typeof x;});}},"?":{lbp:4,led:function(T,e,i){var v,x;x=e.expression(this.lbp-1);e.advance(":");v=e.expression(this.lbp-1);return C.bind(null,i,x,v);},nud:o},")":{led:o,nud:o},"]":{led:o,nud:o},"{":{led:o,nud:function(T,e){var i=true,K,v={},V;while(e.current().id!=="}"){if(i){i=false;}else{e.advance(",");}if(e.current()&&e.current().id==="CONSTANT"&&typeof e.current().value==="string"){K=e.advance().value;}else{K=e.advance("IDENTIFIER").value;}e.advance(":");V=e.expression(0);v[K]=V;}e.advance("}");return j.bind(null,v);}},"}":{lbp:-1,led:o,nud:o},",":{led:o,nud:o},":":{led:o,nud:o}},t=["===","!==","!","||","&&",".","(",")","{","}",":",",","?","*","/","%","+","-","<=","<",">=",">","[","]"],f;t.forEach(function(T,i){t[i]=a(T);});f=new RegExp(t.join("|"),"g");m("*",14,function(x,y){return x*y;});m("/",14,function(x,y){return x/y;});m("%",14,function(x,y){return x%y;});m("+",13,function(x,y){return x+y;}).nud=function(T,e){return l.bind(null,e.expression(this.lbp),function(x){return+x;});};m("-",13,function(x,y){return x-y;}).nud=function(T,e){return l.bind(null,e.expression(this.lbp),function(x){return-x;});};m("<=",11,function(x,y){return x<=y;});m("<",11,function(x,y){return x<y;});m(">=",11,function(x,y){return x>=y;});m(">",11,function(x,y){return x>y;});m("in",11,function(x,y){return x in y;});m("===",10,function(x,y){return x===y;});m("!==",10,function(x,y){return x!==y;});m("&&",7,function(x,y){return x&&y();},true);m("||",6,function(x,y){return x||y();},true);function A(e,i){return e.map(function(v){return v(i);});}function B(i,e){return e[i];}function C(e,T,i,v){return e(v)?T(v):i(v);}function g(v){return v;}function h(e,i,v,R){var x=e(v),y=x[i];if(R){R.base=x;}return y;}function F(e,i,v){var R={};return e(v,R).apply(R.base,i.map(function(x){return x(v);}));}function I(e,R,O,i,v){return O(e(v),i?R.bind(null,v):R(v));}function j(e,i){var K,R={};for(K in e){R[K]=e[K](i);}return R;}function k(e,N,i,R){var v=e(i),x=N(i),y=v[x];if(R){R.base=v;}return y;}function l(R,O,e){return O(R(e));}function m(i,e,O,v){s[i]={lbp:e,led:function(T,x,y){var G=v?this.lbp-1:this.lbp;return I.bind(null,y,x.expression(G),O,v);},nud:o};return s[i];}function n(e,i,v){var x=new SyntaxError(e);x.at=v;x.text=i;if(v!==undefined){e+=" at position "+v;}L.error(e,i,E);throw x;}function o(T){n("Unexpected "+T.id,T.input,T.start+1);}function q(R,v,S){var x=[],y=[],t=[],T=new J();function G(K,S,N){var O=false,Q,V,i;function W(K){if(N){if(K.parts){K.parts.forEach(W);}else{K.targetType=K.targetType||"any";}}}for(Q in K){switch(typeof K[Q]){case"boolean":case"number":case"string":case"undefined":break;default:O=true;}}W(K);if(O){V=J.parseJS(v,S).result;W(V);}else{V=K;}for(i=0;i<x.length;i+=1){if(d(y[i],V)){return i;}}y[i]=V;x[i]=K;return i;}function H(){var i,K,N,O,Q;T.white();i=T.getCh();N=T.getIndex();if((i==="$"||i==="%")&&v[N+1]==="{"){K=R(v,N+1);Q={id:"BINDING",value:G(K.result,N+1,i==="%")};T.setIndex(K.at);}else if(c.test(i)){O=b.exec(v.slice(N));switch(O[0]){case"false":case"null":case"true":Q={id:"CONSTANT",value:T.word()};break;case"in":case"typeof":Q={id:O[0]};T.setIndex(N+O[0].length);break;default:Q={id:"IDENTIFIER",value:O[0]};T.setIndex(N+O[0].length);}}else if(r.test(i)||i==="."&&r.test(v[N+1])){Q={id:"CONSTANT",value:T.number()};}else if(i==="'"||i==='"'){Q={id:"CONSTANT",value:T.string()};}else{f.lastIndex=N;O=f.exec(v);if(!O||O.index!==N){return false;}Q={id:O[0]};T.setIndex(N+O[0].length);}Q.input=v;Q.start=N;Q.end=T.getIndex();t.push(Q);return true;}T.init(v,S);try{while(H()){}}catch(e){if(e.name==="SyntaxError"){t.push({id:"ERROR",value:e});}else{throw e;}}return{at:T.getIndex(),parts:x,tokens:t};}function w(e,i){return function(){try{return e.apply(this,arguments);}catch(v){L.warning(String(v),i,E);}};}function z(t,i,G){var e,N=0,v={advance:x,current:y,expression:H,globals:G,input:i},T;function x(K){var T=t[N];if(K){if(!T){n("Expected "+K+" but instead saw end of input",i);}else if(T.id!==K){n("Expected "+K+" but instead saw "+i.slice(T.start,T.end),i,T.start+1);}}N+=1;return T;}function y(){return t[N];}function H(K){var O;T=x();if(!T){n("Expected expression but instead saw end of input",i);}O=s[T.id].nud(T,v);while(N<t.length){T=y();if(K>=(s[T.id].lbp||0)){break;}x();O=s[T.id].led(T,v,O);}return O;}e=H(0);return{at:y()&&y().start,formatter:w(e,i)};}return{parse:function(R,i,S,G){var e,T;M.average(P,"",p);T=q(R,i,S);e=z(T.tokens,i,G||D);M.end(P);if(!T.parts.length){return{constant:e.formatter(),at:e.at||T.at};}function v(){return e.formatter(arguments);}v.textFragments=true;return{result:{formatter:v,parts:T.parts},at:e.at||T.at};}};},true);
