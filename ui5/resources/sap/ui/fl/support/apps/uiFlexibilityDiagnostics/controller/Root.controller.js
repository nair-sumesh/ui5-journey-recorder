/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery"],function(C,J,q){"use strict";return C.extend("sap.ui.fl.support.apps.uiFlexibilityDiagnostics.controller.Root",{onInit:function(){this._oView=this.getView();this._oDataSelectedModel=new J();this._oDataSelectedModel.setSizeLimit(10000);this._oView.setModel(this._oDataSelectedModel,"selectedData");},formatStatus:function(k,a,f){if(!k||!a||!f){return;}var s=a.indexOf(k)!==-1;var F=f.indexOf(k)!==-1;if(s){if(!F){return"Success";}else{return"Warning";}}if(F){return"Error";}},loadFile:function(e){var f=e.getParameter("files")&&e.getParameter("files")[0];if(f&&window.FileReader){var r=new FileReader();r.onload=function(a){var F=a.target.result;var o=JSON.parse(F);var g=this._createGraphData(o);this._oDataSelectedModel.setData(g);}.bind(this);r.readAsText(f);}},_generateAttributes:function(d){function _(k,s){return{label:"dependency ("+k+")",value:s.id?s.id:s};}var a=[{label:"Layer",value:d.layer},{label:"created at",value:d.creation},{label:"created with app version",value:d.validAppVersions?d.validAppVersions.creation:"N/A"},{label:"created by",value:d.support.user},{label:"selector",value:d.selector.id?d.selector.id:d.selector}];if(d.dependentSelector){q.each(d.dependentSelector,function(D,s){if(Array.isArray(s)){a=a.concat(s.map(_.bind(this,D)));}else{a.push(_(D,s));}});}return a;},_defineIcon:function(c){if(c.indexOf("move")!==-1){return"sap-icon://move";}else if(c.indexOf("add")!==-1){return"sap-icon://add";}else if(c.indexOf("unhide")!==-1){return"sap-icon://show";}else if(c.indexOf("hide")!==-1){return"sap-icon://hide";}else if(c.indexOf("unstash")!==-1){return"sap-icon://show";}else if(c.indexOf("stash")!==-1){return"sap-icon://hide";}else if(c.indexOf("split")!==-1){return"sap-icon://scissors";}else if(c.indexOf("combine")!==-1){return"sap-icon://mirrored-task-circle";}else if(c.indexOf("rename")!==-1){return"sap-icon://text";}return"sap-icon://verify-api";},_generateDependencies:function(f,g){var c=f.mChangesEntries;q.each(c,function(s,m){m.aDependencies.forEach(function(d){g.lines.push({from:d,to:s});});});g.lines.forEach(function(l){var F=l.from;var t=l.to;var L=g.lines.filter(function(m){return m.from==F&&m.to!=t;});var a=[];g.lines.filter(function(m){if(m.from!=F&&m.to==t){a.push(m.from);}});l.obsolete=L.some(function(m){return a.indexOf(m.to)!=-1;});});g.lines=g.lines.filter(function(l){return!l.obsolete;});},_createGraphData:function(f){if(!f.bIsInvestigationExport){throw Error("Flex server response not supported yet!");}var g={nodes:[],groups:[],lines:[],nodeBoxWidth:100,appliedChanges:f.aAppliedChanges,failedChanges:f.aFailedChanges};var c=f.mChangesEntries;q.each(c,function(s,o){var d=o.mDefinition;var a=d.changeType;var n={title:a,key:d.fileName,icon:this._defineIcon(a),group:d.layer,attributes:this._generateAttributes(d)};var G=g.groups.some(function(b){return b.key===n.group;});if(!G){g.groups.push({key:n.group,title:n.group});}g.nodes.push(n);}.bind(this));this._generateDependencies(f,g);return g;}});});
