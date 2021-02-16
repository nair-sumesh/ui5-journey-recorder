/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/odata/type/ODataType","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/thirdparty/jquery"],function(L,D,F,O,P,V,q){"use strict";var f=new Date().getFullYear(),d=new Date(Date.UTC(f,11,31)),o=new Date(f,11,31,23,59,58);function i(t){return t.oConstraints&&t.oConstraints.isDateOnly;}function g(t){return sap.ui.getCore().getLibraryResourceBundle().getText(i(t)?"EnterDate":"EnterDateTime",[t.formatValue(i(t)?d:o,"string")]);}function a(t){var c;if(!t.oFormat){c=q.extend({strictParsing:true},t.oFormatOptions);if(i(t)){c.UTC=true;t.oFormat=D.getDateInstance(c);}else{t.oFormat=D.getDateTimeInstance(c);}}return t.oFormat;}function s(t,c){var n,p;t.oConstraints=undefined;if(c){n=c.nullable;if(n===false||n==="false"){t.oConstraints={nullable:false};}else if(n!==undefined&&n!==true&&n!=="true"){L.warning("Illegal nullable: "+n,null,t.getName());}if(c.isDateOnly===true){t.oConstraints=t.oConstraints||{};t.oConstraints.isDateOnly=true;}p=c.precision;if(p!==undefined){if(p===Math.floor(p)&&p>=1&&p<=12){t.oConstraints=t.oConstraints||{};t.oConstraints.precision=p;}else if(p!==0){L.warning("Illegal precision: "+p,null,t.getName());}}}t._handleLocalizationChange();}var b=O.extend("sap.ui.model.odata.type.DateTimeBase",{constructor:function(c,C){O.apply(this,arguments);s(this,C);this.oFormat=null;this.oFormatOptions=c;},metadata:{"abstract":true}});b.prototype.formatValue=function(v,t){if(v===null||v===undefined){return null;}switch(this.getPrimitiveType(t)){case"any":return v;case"string":if(!(v instanceof Date)){throw new F("Illegal "+this.getName()+" value: "+v);}return a(this).format(v);default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};b.prototype.parseValue=function(v,S){var r;if(v===null||v===""){return null;}switch(this.getPrimitiveType(S)){case"string":r=a(this).parse(v);if(!r){throw new P(g(this));}return r;default:throw new P("Don't know how to parse "+this.getName()+" from "+S);}};b.prototype._handleLocalizationChange=function(){this.oFormat=null;};b.prototype.validateValue=function(v){if(v===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new V(g(this));}return;}else if(v instanceof Date){return;}throw new V("Illegal "+this.getName()+" value: "+v);};return b;});
