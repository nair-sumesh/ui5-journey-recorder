/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/odata/type/ODataType','sap/ui/model/ValidateException','sap/ui/model/type/String',"sap/base/Log"],function(O,V,S,L){"use strict";var r=/^\d+$/,a=/^0*(?=\d)/;function i(v,c){return c&&c.isDigitSequence&&v&&v.match(r);}function s(t,c){var I,m,n;t.oConstraints=undefined;if(c){m=c.maxLength;if(typeof m==="string"){m=parseInt(m,10);}if(typeof m==="number"&&!isNaN(m)&&m>0){t.oConstraints={maxLength:m};}else if(m!==undefined){L.warning("Illegal maxLength: "+c.maxLength,null,t.getName());}I=c.isDigitSequence;if(I===true||I==="true"){t.oConstraints=t.oConstraints||{};t.oConstraints.isDigitSequence=true;}else if(I!==undefined&&I!==false&&I!=="false"){L.warning("Illegal isDigitSequence: "+I,null,t.getName());}n=c.nullable;if(n===false||n==="false"){t.oConstraints=t.oConstraints||{};t.oConstraints.nullable=false;}else if(n!==undefined&&n!==true&&n!=="true"){L.warning("Illegal nullable: "+n,null,t.getName());}}}var E=O.extend("sap.ui.model.odata.type.String",{constructor:function(f,c){O.apply(this,arguments);s(this,c);}});E.prototype.formatValue=function(v,t){if(v===null&&this.getPrimitiveType(t)==="string"){return"";}if(i(v,this.oConstraints)){v=v.replace(a,"");}return S.prototype.formatValue.call(this,v,t);};E.prototype.parseValue=function(v,b){var R;R=v===""?null:S.prototype.parseValue.apply(this,arguments);if(i(R,this.oConstraints)){R=R.replace(a,"");if(this.oConstraints.maxLength){R=R.padStart(this.oConstraints.maxLength,"0");}}return R;};E.prototype.validateValue=function(v){var c=this.oConstraints||{},m=c.maxLength;if(v===null){if(c.nullable!==false){return;}}else if(typeof v!=="string"){throw new V("Illegal "+this.getName()+" value: "+v);}else if(c.isDigitSequence){if(!v.match(r)){throw new V(sap.ui.getCore().getLibraryResourceBundle().getText("EnterDigitsOnly"));}if(m&&v.length>m){throw new V(sap.ui.getCore().getLibraryResourceBundle().getText("EnterMaximumOfDigits",[m]));}return;}else if(!m||v.length<=m){return;}throw new V(sap.ui.getCore().getLibraryResourceBundle().getText(m?"EnterTextMaxLength":"EnterText",[m]));};E.prototype.getName=function(){return"sap.ui.model.odata.type.String";};return E;});
