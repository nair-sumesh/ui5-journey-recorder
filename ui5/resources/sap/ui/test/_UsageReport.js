/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./_OpaLogger","sap/ui/thirdparty/jquery"],function(U,_,q){"use strict";var D="http://localhost:8090";var l=_.getLogger("sap.ui.test._UsageReport");var a=U.extend("sap.ui.test._UsageReport",{constructor:function(c){this.enabled=c&&c.enableUsageReport;this.baseUrl=(c&&c.usageReportUrl||D)+"/api/opa/suites/";if(this.enabled){l.info("Enabled OPA usage report");}var P=sap.ui.test._UsageReport.prototype;Object.keys(P).forEach(function(k){var i=["constructor","getMetadata"].indexOf(k)>-1;if(P.hasOwnProperty(k)&&q.isFunction(P[k])&&!i){var o=P[k];P[k]=function(){if(this.enabled){return o.apply(this,arguments);}};}});},begin:function(d){this._suiteBeginPromise=p(this.baseUrl+"begin",d).done(function(b){this._id=b.id;l.debug("Begin report with ID "+b.id);}.bind(this)).fail(function(e){l.debug("Failed to begin report. Error: "+e);});},moduleUpdate:function(d){this._postSuiteJson("/modules",d).done(function(b){l.debug("Sent report for module "+d.name);}).fail(function(e){l.debug("Failed to send report for module '"+d.name+"'. Error: "+e);});},testDone:function(d){if(this._isOpaEmpty){this._reportTest(d);this._isOpaEmpty=false;}else{this._QUnitTimeoutTest=d;}},opaEmpty:function(o){this._isOpaEmpty=true;if(this._QUnitTimeoutTest){var b=this._QUnitTimeoutTest.assertions;b[b.length-1].message+="\n"+o.errorMessage;this._reportTest(this._QUnitTimeoutTest);this._QUnitTimeoutTest=null;}},done:function(d){this._postSuiteJson("/done",d).done(function(b){l.debug("Completed report with ID "+this._id);}.bind(this)).fail(function(e){l.debug("Failed to complete report with ID "+this._id+". Error: "+e);}.bind(this));},_reportTest:function(d){this._postSuiteJson("/tests",d).done(function(b){l.debug("Sent report for test "+d.name);}).fail(function(e){l.debug("Failed send report for test '"+d.name+"'. Error: "+e);});},_postSuiteJson:function(u,d){var P=this._suiteBeginPromise||q.Deferred().resolve().promise();return P.done(function(){return p.call(this,this.baseUrl+this._id+u,d);}.bind(this));}});function p(u,d){return q.ajax({url:u,type:"POST",data:d,dataType:"json"});}return a;});
