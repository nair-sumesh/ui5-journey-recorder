/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/core/StashedControlSupport','sap/ui/dt/ElementUtil','sap/ui/rta/Utils','sap/ui/rta/util/BindingsExtractor'],function(q,S,E,R,B){"use strict";function _(P,i){var j=q.extend({},P);j.entityName=i.name;var l=P["com.sap.vocabularies.Common.v1.Label"];j.fieldLabel=l&&l.String;var Q=P["com.sap.vocabularies.Common.v1.QuickInfo"];j.quickInfo=Q&&Q.String;var H=P["com.sap.vocabularies.UI.v1.Hidden"];j.hidden=H&&H.Bool==="true";if(!j.hidden){var F=P["com.sap.vocabularies.Common.v1.FieldControl"];if(F){j.hidden=F.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden";}}return j;}function a(P){if(P&&P.type){if(P.type.toLowerCase().indexOf("edm")!==0){return true;}}return false;}function b(O,M,i){return O.reduce(function(j,P){var l=_(P,i);if(a(l)){var C=M.getODataComplexType(l.type);if(C){l=C.property.map(function(w){w=_(w,i);w.bindingPath=l.name+"/"+w.name;w.referencedComplexPropertyName=l.fieldLabel||l.name;return w;});}}else{l.bindingPath=P.name;}return j.concat(l);},[]);}function c(O,i,j){return O.filter(function(P){return!P.hidden;}).filter(function(P){var F=P["com.sap.vocabularies.Common.v1.FieldControl"];var l=F&&F.Path;if(l){var L=i.getBinding(j)instanceof sap.ui.model.ListBinding;if(L){return true;}var w=i.getBindingContext().getProperty(l);return w!==0;}return true;});}function d(i,j){if(!i){return false;}var l=i.getBindingInfo(j);var P=l&&l.path;if(!P){return false;}if(P.indexOf(">")>-1){P=P.split(">").pop();}return P.indexOf("/")===0;}var e=function(i,j,l){return j?i.getBindingInfo(l):i.getBindingContext();};var f=function(i,j){var l=d(i,j);var w=e(i,l,j);if(w){return l?w.path:w.getPath();}};function g(i,j){var M=i.getModel();var D={property:[],navigationProperty:[],navigationEntityNames:[]};if(M){var l=M.getMetadata().getName();if(l==="sap.ui.model.odata.ODataModel"||l==="sap.ui.model.odata.v2.ODataModel"){var w=M.getMetaModel();return w.loaded().then(function(){var x=f(i,j);if(x){var y=w.getMetaContext(x);var O=y.getObject();var z=i.getMetadata().getAggregation();if(z){var C=i.getBindingInfo(z.name);var T=C&&C.template;if(T){var P=i.getBindingPath(z.name);var F=w.getODataAssociationEnd(O,P);var G=F&&F.type;if(G){var H=w.getODataEntityType(G);O=H;}}}D.property=O.property||[];D.property=b(D.property,w,O);D.property=c(D.property,i,j);if(O.navigationProperty){D.navigationProperty=O.navigationProperty;O.navigationProperty.forEach(function(N){var G=(w.getODataAssociationEnd(O,N.name)&&w.getODataAssociationEnd(O,N.name).type);var H=w.getODataEntityType(G);if(H&&H.name){if(D.navigationEntityNames.indexOf(H.name)===-1){D.navigationEntityNames.push(H.name);}}});}}return D;});}}return Promise.resolve(D);}function h(O){return{selected:false,label:O.fieldLabel||O.name,referencedComplexPropertyName:O.referencedComplexPropertyName?O.referencedComplexPropertyName:"",duplicateComplexName:O.duplicateComplexName?O.duplicateComplexName:false,tooltip:O.quickInfo||O.fieldLabel,originalLabel:"",type:"odata",entityType:O.entityName,name:O.name,bindingPath:O.bindingPath};}function k(D){var i=D.element;var j=D.action;return{selected:false,label:E.getLabelForElement(i,j.getLabel),tooltip:i.quickInfoFromOData||i.name||E.getLabelForElement(i,j.getLabel),referencedComplexPropertyName:i.referencedComplexPropertyName?i.referencedComplexPropertyName:"",duplicateComplexName:i.duplicateComplexName?i.duplicateComplexName:false,bindingPaths:i.bindingPaths,originalLabel:i.renamedLabel&&i.fieldLabel!==i.labelFromOData?i.labelFromOData:"",type:"invisible",elementId:i.getId()};}function m(i,j,l){if(j&&j!==i){var w=R.getEntityTypeByPath(i.getModel(),f(i,l));return E.findAllSiblingsInContainer(i,j).filter(function(x){var P=f(x,l);if(P){return R.getEntityTypeByPath(x.getModel(),P)===w;}return false;});}else{return[i];}}function n(O){O.forEach(function(i,l,O){if(i["duplicateComplexName"]!==true){for(var j=l+1;j<O.length-1;j++){if(i.fieldLabel===O[j].fieldLabel){i["duplicateComplexName"]=true;O[j]["duplicateComplexName"]=true;}}}});return O;}function o(i,O){return O.some(function(D){return D.fieldLabel===i.fieldLabel;});}function p(I,M){I.bindingPaths=[];I.bindingContextPaths=[];var j=I.sParentAggregationName;var P=I.getParent();var w=B.getBindings(I,M);if(P){var D=P.getMetadata().getAggregation();if(D){var x=E.getAggregation(P,j).indexOf(I);var y=D.name;var z=P.getBindingInfo(y);var T=z&&z.template;if(T){var C=T.getMetadata().getAggregation();if(C){var F=C.name;var G=E.getAggregation(T,F)[x];w=w.concat(B.getBindings(G,null,true));}}}}for(var i=0,l=w.length;i<l;i++){if(w[i].getPath&&w[i].getPath()){if(I.bindingPaths.indexOf(w[i].getPath())===-1){I.bindingPaths.push(w[i].getPath());}}if(w[i].getContext&&w[i].getContext()){if(I.bindingContextPaths.indexOf(w[i].getContext().getPath())===-1){I.bindingContextPaths.push(w[i].getContext().getPath());}}if(q.isPlainObject(w[i])){if(I.bindingPaths.indexOf(w[i].parts[0].path)===-1){I.bindingPaths.push(w[i].parts[0].path);}}}return I;}function r(i){return Array.isArray(i)&&i.length>0;}function s(i,N,j,l){var w=r(i)&&i.some(function(P){var y=P.trim().replace(/^\//gi,'').split('/');if(y.length>1){return N.indexOf(y.shift())!==-1;}});var x=l.some(function(C){C=C.match(/^\/?([A-Za-z0-9_]+)/)[0];return(j.indexOf(C)>=0);});return w||x;}function t(i,O){return O.filter(function(D){return i.indexOf(D.bindingPath)!==-1;}).pop();}function u(i,O){i.labelFromOData=O.fieldLabel;i.quickInfoFromOData=O.quickInfo;i.name=O.name;if(i.fieldLabel!==i.labelFromOData){i.renamedLabel=true;}if(O.referencedComplexPropertyName){i.referencedComplexPropertyName=O.referencedComplexPropertyName;}}function v(i,O,N,j){var l=i.bindingPaths,w=i.bindingContextPaths,x;return(!r(l)||s(l,N,j,w)||((x=t(l,O))&&(u(i,x)||true)));}var A={enhanceInvisibleElements:function(i,j){var M=i.getModel();var l=j.reveal;var w=j.addODataProperty;var D=i.getMetadata().getAggregation();var x=D?D.name:j.aggregation;return Promise.resolve().then(function(){return g(i,x);}).then(function(y){var O=y.property;var z=y.navigationProperty.map(function(N){return N.name;});var C=y.navigationEntityNames;O=n(O);var F=[];var I=l.elements||[];I.forEach(function(G){var T=G.getMetadata().getName();var H=l.types[T].action;var J=true;if(f(i,x)===f(G,x)){G=p(G,M);G.fieldLabel=E.getLabelForElement(G,H.getLabel);G.duplicateComplexName=o(G,O);if(w&&O.length>0){J=v(G,O,z,C);}}else if(G.getParent()&&B.getBindings(G,M).length>0){J=false;}if(J){F.push({element:G,action:H});}});return F;}).then(function(y){return y.map(k);});},getUnboundODataProperties:function(i,j){var D=i.getMetadata().getAggregation();var l=D?D.name:j.action.aggregation;var M=i.getModel();return Promise.resolve().then(function(){return g(i,l);}).then(function(w){var O=w.property;var x=m(i,j.relevantContainer,l);var y=[];x.forEach(function(i){y=y.concat(B.getBindings(i,M));});var F=j.action.filter?j.action.filter:function(){return true;};O=O.filter(function(z){var H=false;if(y){H=y.some(function(C){return(q.isPlainObject(C)?C.parts[0].path:!!C.getPath&&C.getPath())===z.bindingPath;});}return!H&&F(j.relevantContainer,z);});O=n(O);return O;}).then(function(U){return U.map(h);});}};return A;});
