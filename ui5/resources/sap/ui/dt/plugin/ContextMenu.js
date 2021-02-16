/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/dt/Plugin','sap/ui/dt/ContextMenuControl','sap/ui/dt/Util','sap/ui/Device',"sap/base/assert","sap/ui/events/KeyCodes","sap/base/util/merge"],function(q,P,C,U,D,a,K,m){"use strict";var b=P.extend("sap.ui.dt.plugin.ContextMenu",{metadata:{properties:{contextElement:{type:"object"},styleClass:{type:"string"},openOnHover:{type:"boolean",defaultValue:true},openOnClick:{type:"boolean",defaultValue:true}},events:{openedContextMenu:{},closedContextMenu:{}}}});b.prototype.init=function(){this.iMenuLeftclickOpeningDelay=0;this.iMenuHoverOpeningDelay=500;this.iMenuHoverClosingDelay=250;this.oContextMenuControl=new C({maxButtonsDisplayed:4});this.oContextMenuControl.attachClosed(this._contextMenuClosed,this);this.oContextMenuControl.attachOverflowButtonPressed(this._pressedOverflowButton,this);this._aMenuItems=[];this._aGroupedItems=[];this._aSubMenus=[];this._aPluginsWithBusyFunction=[];};b.prototype.exit=function(){this._clearHoverTimeout();delete this._aMenuItems;if(this.oContextMenuControl){this.oContextMenuControl.detachClosed(this._contextMenuClosed,this);this.oContextMenuControl.detachOverflowButtonPressed(this._pressedOverflowButton,this);this.oContextMenuControl.destroy();delete this.oContextMenuControl;}};b.prototype.addMenuItem=function(M,r,p){var c={menuItem:M,fromPlugin:!!r,bPersistOneTime:p};this._aMenuItems.push(c);};b.prototype.registerElementOverlay=function(o){o.attachBrowserEvent("click",this._onClickorTouch,this);o.attachBrowserEvent("touchstart",this._onClickorTouch,this);o.attachBrowserEvent("contextmenu",this._onContextMenu,this);o.attachBrowserEvent("keydown",this._onKeyDown,this);};b.prototype.deregisterElementOverlay=function(o){o.detachBrowserEvent("click",this._onClickorTouch,this);o.detachBrowserEvent("touchstart",this._onClickorTouch,this);o.detachBrowserEvent("contextmenu",this._onContextMenu,this);o.detachBrowserEvent("keydown",this._onKeyDown,this);};b.prototype.open=function(e,o,c,i){this._bContextMenu=!!c;this._aPluginsWithBusyFunction=[];this.setContextElement(o.getElement());var p=this.getDesignTime().getPlugins();p.forEach(function(d){if(d.isBusy){this._aPluginsWithBusyFunction.push(d);}}.bind(this));this.getDesignTime().getSelectionManager().attachChange(this._onSelectionChanged,this);var s=this.getSelectedOverlays().filter(function(E){return E!==o;});s.unshift(o);this._aMenuItems=this._aMenuItems.filter(function(d){if(d.bPersistOneTime){d.bPersistOneTime=false;return true;}return!d.fromPlugin;});if(!i){this._aGroupedItems=[];this._aSubMenus=[];p.forEach(function(d){var f=d.getMenuItems(s)||[];f.forEach(function(g){if(g.group!=undefined&&!c){this._addMenuItemToGroup(g);}else if(g.submenu!=undefined){this._addSubMenu(g,e,o);}else{this.addMenuItem(g,true);}}.bind(this));}.bind(this));this._addItemGroupsToMenu(e,o);}var M=this._aMenuItems.map(function(d){return d.menuItem;});if(M.length>0){this.oContextMenuControl._bUseExpPop=!!c;M=this._sortMenuItems(M);this.oContextMenuControl.setButtons(M,this._onItemSelected.bind(this),s);this.oContextMenuControl.setStyleClass(this.getStyleClass());if(i){this.oContextMenuControl.setOpenNew(true);}this.oContextMenuControl.show(o,c,{x:e.clientX,y:e.clientY});}this.fireOpenedContextMenu();};b.prototype._sortMenuItems=function(M){return M.sort(function(f,s){if(!f.rank&&!s.rank){return 0;}if(!f.rank&&s.rank){return-1;}if(f.rank&&!s.rank){return 1;}return f.rank-s.rank;});};b.prototype._onContextMenu=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(o&&o.isSelectable()){e.preventDefault();this._oCurrentOverlay=sap.ui.getCore().byId(e.currentTarget.id);this.oContextMenuControl.close(true);this._bOpenedByHover=false;if(document.activeElement){document.activeElement.blur();}clearTimeout(this.hoverTimeout);this._ensureSelection(o);clearTimeout(this.clickTimeout);this.lockMenuOpening();this.oContextMenuControl.setOpenNew(true);this.open(e,o,true);e.stopPropagation();}};b.prototype._onItemSelected=function(e){this.oContextMenuControl.close(true);this._ensureSelection(this._oCurrentOverlay);this.setFocusLock(true);var s=[],c=this.getContextElement(),S=e.data("id");this._aMenuItems.some(function(M){if(S===M.menuItem.id){var i=M.menuItem;s=this.getSelectedOverlays();a(s.length>0,"sap.ui.rta - Opening context menu, with empty selection - check event order");var p={};p.eventItem=e;p.contextElement=c;i.handler(s,p);i=null;return true;}},this);};b.prototype._onClickorTouch=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(o&&o.isSelectable()&&o.getSelected()&&this.getOpenOnClick()){if(this.isMenuOpeningLocked()){this.unlockMenuOpening();this.oContextMenuControl.close();}this._startOpeningWithDelay(e);}};b.prototype._startOpeningWithDelay=function(e){var c=m({},e);this.clickTimeout=setTimeout(function(){this._startOpening(c,true);}.bind(this),this.iMenuLeftclickOpeningDelay);};b.prototype._startOpening=function(e,l){clearTimeout(this.hoverTimeout);this._bOpenedByHover=false;if(this._oTempTarget!=e.currentTarget.id){clearTimeout(this.clickTimeout);}this._oTempTarget=e.currentTarget.id;var o=sap.ui.getCore().byId(e.currentTarget.id);var t=e.target.className;if(o&&o.isSelectable()&&t.indexOf("sapUiDtOverlay")>-1&&(!this.isMenuOpeningLocked())){e.stopPropagation();if(this._shouldContextMenuOpen(e)){this._ensureSelection(o);if(this._oCurrentOverlay.isSelected()||D.os.android){if(l){this.lockMenuOpening();}this.oContextMenuControl.setOpenNew(true);this.open(e,o);return true;}}}};b.prototype._onHover=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(o&&o.isSelectable()&&!e.ctrlKey&&this.getOpenOnHover()){e.stopPropagation();if(this._shouldContextMenuOpen(e,true)){if(this.iMenuHoverClosingDelay>=this.iMenuHoverOpeningDelay){q.error("sap.ui.dt ContextMenu iMenuHoverClosingDelay is bigger or equal to iMenuHoverOpeningDelay!");}if(this.oContextMenuControl.getPopover().isOpen()){this._closingTimeout=setTimeout(function(){if(this.oContextMenuControl.getPopover().isOpen()){this.oContextMenuControl.close();}}.bind(this),this.iMenuHoverClosingDelay);}this.hoverTimeout=setTimeout(function(){sap.ui.getCore().byId(e.currentTarget.id).focus();this._startOpening(e);this._bOpenedByHover=true;}.bind(this),this.iMenuHoverOpeningDelay);}}};b.prototype._clearHoverTimeout=function(){if(this.hoverTimeout){clearTimeout(this.hoverTimeout);this.hoverTimeout=null;}if(this._closingTimeout){clearTimeout(this._closingTimeout);this._closingTimeout=null;}};b.prototype._onKeyDown=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if((e.keyCode===K.SPACE||e.keyCode===K.ENTER)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o&&o.isSelectable()){this._startOpening(e,true);e.stopPropagation();}}if((e.keyCode===K.F10)&&(e.shiftKey===true)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o&&o.isSelectable()){e.preventDefault();e.clientX=o.$().offset().left+o.$().width()/2;e.clientY=o.$().offset().top+o.$().height()/2;this._onContextMenu(e);}}};b.prototype._shouldContextMenuOpen=function(e,o){if((!this._checkForPluginLock()&&!this.isMenuOpeningLocked())){if(!o){this._oCurrentOverlay=sap.ui.getCore().byId(e.currentTarget.id);}return true;}else{return false;}};b.prototype._pressedOverflowButton=function(){this.lockMenuOpening();this.setFocusLock(true);};b.prototype._contextMenuClosed=function(){this.unlockMenuOpening();this.setFocusLock(false);};b.prototype._onSelectionChanged=function(){this.oContextMenuControl.close();this.getDesignTime().getSelectionManager().detachChange(this._onSelectionChanged,this);};b.prototype.lockMenuOpening=function(o){if((this.oContextMenuControl.getPopover(true).isOpen()||this.oContextMenuControl.getPopover(false).isOpen())&&o!==true){this._bAsyncLock=true;}else{this._bOpeningLocked=true;}};b.prototype.unlockMenuOpening=function(){this._bOpeningLocked=false;if(this._bAsyncLock){this.lockMenuOpening(true);}this._bAsyncLock=false;this.resetFocus();};b.prototype.isMenuOpeningLocked=function(){return this._bOpeningLocked;};b.prototype.setFocusLock=function(i){this._bFocusLocked=i;};b.prototype.resetFocus=function(){if(!this._bFocusLocked&&this._oCurrentOverlay&&document.activeElement){if(!D.os.ios){this._oCurrentOverlay.focus();}}};b.prototype._ensureSelection=function(o){if(o&&!o.isSelected()){o.setSelected(true);}};b.prototype._checkForPluginLock=function(){if(D.os.ios){return false;}if(this._aPluginsWithBusyFunction.some(function(p){return(typeof p.isBusy==="function"&&p.isBusy());})){return true;}this.setFocusLock(false);return false;};b.prototype._addMenuItemToGroup=function(M){var g=this._aGroupedItems.some(function(_){if(_.sGroupName===M.group){_.aGroupedItems.push(M);return true;}});if(!g){this._aGroupedItems.push({sGroupName:M.group,aGroupedItems:[M]});}};b.prototype._addSubMenu=function(M,e,o){M.submenu.forEach(function(s){s.handler=M.handler;});M.handler=function(s,e,o,O,p){this._aSubMenus.some(function(_){if(_.sSubMenuId===s){_.aSubMenuItems.forEach(function(S){this.addMenuItem(S,true,true);}.bind(this));return true;}}.bind(this));if(!this._bContextMenu){e.clientX=null;e.clientY=null;}this.oContextMenuControl.close();setTimeout(function(){this.open(e,o,true,true);}.bind(this),0);this.lockMenuOpening();}.bind(this,M.id,e,o);this._aSubMenus.push({sSubMenuId:M.id,aSubMenuItems:M.submenu});this.addMenuItem(M,true);};b.prototype._addItemGroupsToMenu=function(e,o){this._aGroupedItems.forEach(function(g,i){if(g.aGroupedItems.length===1){this.addMenuItem(g.aGroupedItems[0],true,false);}else{var h=function(i,e,o){this._aGroupedItems[i].aGroupedItems.forEach(function(M){this.addMenuItem(M,true,true);}.bind(this));e.clientX=null;e.clientY=null;this.oContextMenuControl.close();setTimeout(function(){this.open(e,o,true,true);}.bind(this),0);this.lockMenuOpening();};this.addMenuItem({id:g.sGroupName+"-groupButton",enabled:true,text:g.sGroupName,icon:g.aGroupedItems[0].icon,rank:g.aGroupedItems[0].rank,handler:h.bind(this,i,e,o)},true);}}.bind(this));};return b;},true);
