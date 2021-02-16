/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object','./MessageProcessor',"sap/base/util/uid","sap/base/Log"],function(O,M,u,L){"use strict";var a=O.extend("sap.ui.core.message.Message",{constructor:function(p){O.apply(this,arguments);p=p||{};this.id=p.id?p.id:u();this.message=p.message;this.description=p.description;this.descriptionUrl=p.descriptionUrl;this.additionalText=p.additionalText;this.setType(p.type||sap.ui.core.MessageType.None);this.code=p.code;this.target=p.target;this.processor=p.processor;this.persistent=p.persistent||false;this.technical=p.technical||false;this.references=p.references||{};this.validation=!!p.validation;this.date=p.date||Date.now();this.controlId=undefined;}});a.prototype.getId=function(){return this.id;};a.prototype.setMessage=function(m){this.message=m;};a.prototype.getMessage=function(){return this.message;};a.prototype.setControlId=function(c){this.controlId=c;};a.prototype.getControlId=function(){return this.controlId;};a.prototype.setDescription=function(d){this.description=d;};a.prototype.getDescription=function(){return this.description;};a.prototype.setAdditionalText=function(A){this.additionalText=A;};a.prototype.getAdditionalText=function(){return this.additionalText;};a.prototype.getDescriptionUrl=function(){return this.descriptionUrl;};a.prototype.setDescriptionUrl=function(d){this.descriptionUrl=d;};a.prototype.setType=function(t){if(t in sap.ui.core.MessageType){this.type=t;}else{L.error("MessageType must be of type sap.ui.core.MessageType");}};a.prototype.getType=function(){return this.type;};a.prototype.setTarget=function(t){this.target=t;};a.prototype.getTarget=function(){return this.target;};a.prototype.setMessageProcessor=function(m){if(m instanceof M){this.processor=m;}else{L.error("MessageProcessor must be an instance of sap.ui.core.message.MessageProcessor");}};a.prototype.getMessageProcessor=function(){return this.processor;};a.prototype.setCode=function(c){this.code=c;};a.prototype.getCode=function(){return this.code;};a.prototype.setPersistent=function(p){this.persistent=p;};a.prototype.getPersistent=function(){return this.persistent;};a.prototype.setTechnical=function(t){this.technical=t;};a.prototype.getTechnical=function(){return this.technical;};a.prototype.addReference=function(i,p){if(!i){return;}if(!this.references[i]){this.references[i]={properties:{}};}if(!this.references[i].properties[p]){this.references[i].properties[p]=true;}};a.prototype.removeReference=function(i,p){if(!i){return;}if(i in this.references){if(!p){delete this.references[i];}else if(this.references[i].properties[p]){delete this.references[i].properties[p];}}};a.prototype.setDate=function(d){this.date=d;};a.prototype.getDate=function(){return this.date;};return a;});
