/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/List","sap/m/InputListItem",'sap/m/Button','sap/m/ComboBox','sap/m/Dialog','sap/m/DialogRenderer','sap/m/Input','sap/m/Label','sap/m/MessageToast','sap/ui/core/ListItem','sap/ui/fl/transport/Transports'],function(L,I,B,C,D,a,b,c,M,d,T){"use strict";var e=D.extend("sap.ui.fl.transport.TransportDialog",{metadata:{library:"sap.ui.fl",properties:{pkg:{type:"string",group:"Misc",defaultValue:null},transports:{type:"any",group:"Misc",defaultValue:null},lrepObject:{type:"any",group:"Misc",defaultValue:null},hidePackage:{type:"boolean",group:"Misc",defaultValue:null}},events:{ok:{},cancel:{}}},renderer:a.render});e.prototype.init=function(){D.prototype.init.apply(this);this._oResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE"));this._oPackageLabel=null;this._oPackage=this._createPackageField();this._oTransport=this._createTransportCombo();this.addContent(this._createContentList());this._createButtons();};e.prototype._createContentList=function(){this._oPackageListItem=new I({label:this._oResources.getText("TRANSPORT_DIALOG_PACKAGE"),content:[this._oPackage]});this._oTransportListItem=new I({label:this._oResources.getText("TRANSPORT_DIALOG_TRANSPORT"),content:[this._oTransport]});return new L({items:[this._oPackageListItem,this._oTransportListItem]});};e.prototype._createButtons=function(){var t=this;this.addButton(new B({text:this._oResources.getText("TRANSPORT_DIALOG_LOCAL_OBJECT"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_LOCAL_OBJECT"),press:function(){t._onLocal();}}));this.addButton(new B({text:this._oResources.getText("TRANSPORT_DIALOG_OK"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_OK"),enabled:false,press:function(){t._onOkay();}}));this.addButton(new B({text:this._oResources.getText("TRANSPORT_DIALOG_CANCEL"),tooltip:this._oResources.getText("TRANSPORT_DIALOG_CANCEL"),press:function(){t.fireCancel();t.close();t.destroy();}}));};e.prototype._onLocal=function(){this.fireOk({selectedTransport:"",selectedPackage:this.getPkg()||"$TMP",dialog:true});this.close();this.destroy();};e.prototype._onOkay=function(){var t=this._oTransport.getSelectedKey();if(this._checkOkay(t)){this.fireOk({selectedTransport:t,selectedPackage:this.getPkg()||this._oPackage.getValue(),dialog:true});this.close();this.destroy();}else{this.getButtons()[1].setEnabled(false);this._oTransport.setValueState(sap.ui.core.ValueState.Error);this._oTransport.setValueStateText(this.getTitle());}};e.prototype._checkOkay=function(t){if(t){return true;}return false;};e.prototype._createTransportCombo=function(){var t=this;return new C({showSecondaryValues:true,enabled:false,tooltip:this._oResources.getText("TRANSPORT_DIALOG_TRANSPORT_TT"),width:"100%",selectionChange:function(){if(t._oPackageListItem.getVisible()&&!t._oPackage.getValue()){return;}t.getButtons()[1].setEnabled(true);t._oTransport.setValueState(sap.ui.core.ValueState.None);},change:function(E){var f=function(i){if((i&&E.mParameters.newValue!==i.getText())||!i){return true;}return false;};if(E&&E.mParameters&&E.mParameters.newValue){if(f(t._oTransport.getSelectedItem())){t.getButtons()[1].setEnabled(false);t._oTransport.setValueState(sap.ui.core.ValueState.Error);t._oTransport.setValueStateText(t._oResources.getText("TRANSPORT_DIALOG_TRANSPORT_TT"));}}}});};e.prototype._createPackageField=function(){var t=this;return new b({tooltip:this._oResources.getText("TRANSPORT_DIALOG_PACKAGE_TT"),width:"100%",change:function(){var o,p,O;O=t._createObjectInfo();o=new sap.ui.fl.transport.Transports();p=o.getTransports(O);p.then(function(r){t._onPackageChangeSuccess(r);},function(r){t._onPackageChangeError(r);});},liveChange:function(E){if(E.mParameters.liveValue&&E.mParameters.liveValue.length>3){t._oTransport.setEnabled(true);}}});};e.prototype._createObjectInfo=function(){var o,r={"package":this._oPackage.getValue()||""};o=this.getProperty("lrepObject");if(o){if(o.name){r.name=o.name;}if(o.type){r.type=o.type;}if(o.namespace){r.namespace=o.namespace;}}return r;};e.prototype._onPackageChangeSuccess=function(t){if(t){if(t.localonly){this._oTransport.setEnabled(false);this.getButtons()[1].setEnabled(true);}else if(t.transports&&t.transports.length>0){this._oTransport.setEnabled(true);this._setTransports(t);}else if(t.errorCode){this.getButtons()[1].setEnabled(false);this._oPackage.setValueState(sap.ui.core.ValueState.Error);this._oPackage.setValueStateText(this._oResources.getText("TRANSPORT_DIALOG_"+t.errorCode));this._setTransports(t);}else{M.show(this._oResources.getText("TRANSPORT_DIALOG_NO_TRANSPORTS"));}}};e.prototype._setTransports=function(t){var l,f;l=this._hasLock(t.transports);if(l){f=[l];}else{f=t.transports;}this.setTransports(f);if(f&&f.length===1){this._oTransport.setValue(f[0].description,true);this.getButtons()[1].setEnabled(true);}if(!f||f.length===0){this._oTransport.setSelectedKey(null);this._oTransport.setValueState(sap.ui.core.ValueState.None);this.getButtons()[1].setEnabled(false);}};e.prototype._onPackageChangeError=function(r){M.show(r);this.setTransports([]);};e.prototype._hasLock=function(t){var o,l=t.length;while(l--){o=t[l];if(o.locked){return o;}}return null;};e.prototype.setPkg=function(p){if(p&&!this.getProperty("pkg")){this.setProperty("pkg",p);this._oPackage.setValue(p);this._oPackage.setEnabled(false);this._oTransport.setEnabled(true);this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE_SIMPLE"));this.getButtons()[0].setVisible(false);}};e.prototype.setTransports=function(s){var i,l=0,o;if(s){this.setProperty("transports",s);this._oTransport.removeAllItems();l=s.length;for(i=0;i<l;i++){o=s[i];this._oTransport.addItem(new d({key:o.transportId,text:o.transportId,additionalText:o.description}));}if(l===1){this._oTransport.setSelectedKey(s[0].transportId);this.getButtons()[1].setEnabled(true);}if(l>0){this._oTransport.setEnabled(true);}}};e.prototype.setLrepObject=function(o){if(o&&!this.getProperty("lrepObject")){this.setProperty("lrepObject",o);}};e.prototype.setHidePackage=function(h){this.setProperty("hidePackage",h);this._oPackageListItem.setVisible(!h);if(h){this.getButtons()[0].setEnabled(h);this.setTitle(this._oResources.getText("TRANSPORT_DIALOG_TITLE_SIMPLE"));}};return e;},true);
