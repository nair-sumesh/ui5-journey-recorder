/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/base/DataType','sap/ui/base/EventProvider','sap/ui/core/Control','sap/base/util/ObjectPath','sap/ui/core/library',"sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/assert","sap/base/Log","sap/base/util/defineLazyProperty","sap/base/security/encodeXML",'./Support'],function(D,a,E,C,O,b,d,q,e,L,f,g){"use strict";sap.ui.getCore().initLibrary({name:"sap.m",version:"1.58.5",dependencies:["sap.ui.core"],designtime:"sap/m/designtime/library.designtime",types:["sap.m.BackgroundDesign","sap.m.BarDesign","sap.m.ButtonType","sap.m.CarouselArrowsPlacement","sap.m.DateTimeInputType","sap.m.DialogType","sap.m.DeviationIndicator","sap.m.DraftIndicatorState","sap.m.FacetFilterListDataType","sap.m.FacetFilterType","sap.m.FlexAlignItems","sap.m.FlexAlignSelf","sap.m.FlexDirection","sap.m.FlexWrap","sap.m.FlexJustifyContent","sap.m.FlexRendertype","sap.m.FrameType","sap.m.GenericTileMode","sap.m.GenericTileScope","sap.m.HeaderLevel","sap.m.IBarHTMLTag","sap.m.IconTabFilterDesign","sap.m.ImageMode","sap.m.Size","sap.m.ValueColor","sap.m.ValueCSSColor","sap.m.InputType","sap.m.LabelDesign","sap.m.LinkConversion","sap.m.ListGrowingDirection","sap.m.ListHeaderDesign","sap.m.ListKeyboardMode","sap.m.ListMode","sap.m.ListSeparators","sap.m.ListType","sap.m.LoadState","sap.m.MenuButtonMode","sap.m.OverflowToolbarPriority","sap.m.P13nPanelType","sap.m.PageBackgroundDesign","sap.m.PanelAccessibleRole","sap.m.PDFViewerDisplayTypes","sap.m.PlacementType","sap.m.PopinDisplay","sap.m.PopinLayout","sap.m.QuickViewGroupElementType","sap.m.RatingIndicatorVisualMode","sap.m.ScreenSize","sap.m.SelectionDetailsActionLevel","sap.m.SelectListKeyboardNavigationMode","sap.m.SelectType","sap.m.SplitAppMode","sap.m.StandardTileType","sap.m.StringFilterOperator","sap.m.SwipeDirection","sap.m.SwitchType","sap.m.TimePickerMaskMode","sap.m.TileSizeBehavior","sap.m.ToolbarDesign","sap.m.VerticalPlacementType","sap.m.semantic.SemanticRuleSetType"],interfaces:["sap.m.IBar","sap.m.IBreadcrumbs","sap.m.IconTab","sap.m.IScale","sap.m.semantic.IGroup","sap.m.semantic.IFilter","sap.m.semantic.ISort","sap.m.ObjectHeaderContainer","sap.m.IOverflowToolbarContent"],controls:["sap.m.ActionListItem","sap.m.ActionSelect","sap.m.ActionSheet","sap.m.App","sap.m.Bar","sap.m.BusyDialog","sap.m.BusyIndicator","sap.m.Button","sap.m.Breadcrumbs","sap.m.Carousel","sap.m.CheckBox","sap.m.ColumnListItem","sap.m.ColorPalette","sap.m.ColorPalettePopover","sap.m.ComboBox","sap.m.ComboBoxTextField","sap.m.ComboBoxBase","sap.m.CustomListItem","sap.m.CustomTile","sap.m.CustomTreeItem","sap.m.ColumnHeader","sap.m.DatePicker","sap.m.DateRangeSelection","sap.m.DateTimeField","sap.m.DateTimeInput","sap.m.DateTimePicker","sap.m.Dialog","sap.m.DisplayListItem","sap.m.DraftIndicator","sap.m.FacetFilter","sap.m.FacetFilterItem","sap.m.FacetFilterList","sap.m.FeedContent","sap.m.FeedInput","sap.m.FeedListItem","sap.m.FlexBox","sap.m.FormattedText","sap.m.GenericTile","sap.m.GroupHeaderListItem","sap.m.GrowingList","sap.m.HBox","sap.m.HeaderContainer","sap.m.IconTabBar","sap.m.IconTabBarSelectList","sap.m.IconTabHeader","sap.m.Image","sap.m.ImageContent","sap.m.Input","sap.m.InputBase","sap.m.InputListItem","sap.m.Label","sap.m.LightBox","sap.m.Link","sap.m.List","sap.m.ListBase","sap.m.ListItemBase","sap.m.MaskInput","sap.m.Menu","sap.m.MenuButton","sap.m.MessagePage","sap.m.MessagePopover","sap.m.MessageView","sap.m.MessageStrip","sap.m.MultiComboBox","sap.m.MultiEditField","sap.m.MultiInput","sap.m.NavContainer","sap.m.NewsContent","sap.m.NumericContent","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.NotificationListGroup","sap.m.PagingButton","sap.m.PlanningCalendarLegend","sap.m.ObjectAttribute","sap.m.ObjectHeader","sap.m.ObjectIdentifier","sap.m.ObjectListItem","sap.m.ObjectMarker","sap.m.ObjectNumber","sap.m.ObjectStatus","sap.m.OnePersonCalendar","sap.m.OnePersonGrid","sap.m.OnePersonHeader","sap.m.OverflowToolbar","sap.m.OverflowToolbarButton","sap.m.OverflowToolbarToggleButton","sap.m.P13nColumnsPanel","sap.m.P13nSelectionPanel","sap.m.P13nDimMeasurePanel","sap.m.P13nConditionPanel","sap.m.P13nDialog","sap.m.P13nFilterPanel","sap.m.P13nPanel","sap.m.P13nSortPanel","sap.m.Page","sap.m.Panel","sap.m.PDFViewer","sap.m.PlanningCalendar","sap.m.Popover","sap.m.ProgressIndicator","sap.m.PullToRefresh","sap.m.QuickView","sap.m.QuickViewCard","sap.m.QuickViewPage","sap.m.RadioButton","sap.m.RadioButtonGroup","sap.m.RangeSlider","sap.m.RatingIndicator","sap.m.ResponsivePopover","sap.m.ScrollContainer","sap.m.SearchField","sap.m.SegmentedButton","sap.m.Select","sap.m.SelectDialog","sap.m.SelectList","sap.m.SelectionDetails","sap.m.Shell","sap.m.Slider","sap.m.SliderTooltip","sap.m.SliderTooltipContainer","sap.m.SlideTile","sap.m.StepInput","sap.m.SplitApp","sap.m.SplitContainer","sap.m.StandardListItem","sap.m.StandardTreeItem","sap.m.StandardTile","sap.m.Switch","sap.m.Table","sap.m.TableSelectDialog","sap.m.TabContainer","sap.m.TabStrip","sap.m.Text","sap.m.TextArea","sap.m.Tile","sap.m.TileContainer","sap.m.TileContent","sap.m.TimePicker","sap.m.TimePickerSliders","sap.m.Title","sap.m.ToggleButton","sap.m.Token","sap.m.Tokenizer","sap.m.Toolbar","sap.m.ToolbarSpacer","sap.m.ToolbarSeparator","sap.m.Tree","sap.m.TreeItemBase","sap.m.UploadCollection","sap.m.UploadCollectionToolbarPlaceholder","sap.m.VBox","sap.m.ViewSettingsDialog","sap.m.ViewSettingsPopover","sap.m.semantic.DetailPage","sap.m.semantic.SemanticPage","sap.m.semantic.ShareMenuPage","sap.m.semantic.FullscreenPage","sap.m.semantic.MasterPage","sap.m.Wizard","sap.m.WizardStep"],elements:["sap.m.CalendarAppointment","sap.m.Column","sap.m.FlexItemData","sap.m.FeedListItemAction","sap.m.IconTabFilter","sap.m.IconTabSeparator","sap.m.LightBoxItem","sap.m.OnePersonView","sap.m.OverflowToolbarLayoutData","sap.m.MaskInputRule","sap.m.MenuItem","sap.m.MessageItem","sap.m.MessagePopoverItem","sap.m.PageAccessibleLandmarkInfo","sap.m.P13nFilterItem","sap.m.P13nItem","sap.m.PlanningCalendarRow","sap.m.PlanningCalendarView","sap.m.P13nColumnsItem","sap.m.P13nDimMeasureItem","sap.m.P13nSortItem","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.ResponsiveScale","sap.m.SegmentedButtonItem","sap.m.SelectionDetailsItem","sap.m.SelectionDetailsItemLine","sap.m.SuggestionItem","sap.m.TabContainerItem","sap.m.TabStripItem","sap.m.ToolbarLayoutData","sap.m.UploadCollectionItem","sap.m.UploadCollectionParameter","sap.m.ViewSettingsCustomItem","sap.m.ViewSettingsCustomTab","sap.m.ViewSettingsFilterItem","sap.m.ViewSettingsItem","sap.m.semantic.SemanticButton","sap.m.semantic.SemanticSelect","sap.m.semantic.AddAction","sap.m.semantic.CancelAction","sap.m.semantic.DeleteAction","sap.m.semantic.DiscussInJamAction","sap.m.semantic.EditAction","sap.m.semantic.FavoriteAction","sap.m.semantic.FilterAction","sap.m.semantic.FilterSelect","sap.m.semantic.FlagAction","sap.m.semantic.ForwardAction","sap.m.semantic.GroupAction","sap.m.semantic.GroupSelect","sap.m.semantic.MainAction","sap.m.semantic.MessagesIndicator","sap.m.semantic.MultiSelectAction","sap.m.semantic.NegativeAction","sap.m.semantic.OpenInAction","sap.m.semantic.PositiveAction","sap.m.semantic.PrintAction","sap.m.semantic.SaveAction","sap.m.semantic.SendEmailAction","sap.m.semantic.SendMessageAction","sap.m.semantic.ShareInJamAction","sap.m.semantic.SortAction","sap.m.semantic.SortSelect"],extensions:{flChangeHandlers:{"sap.m.ActionSheet":{"moveControls":"default"},"sap.m.Bar":"sap/m/flexibility/Bar","sap.m.Button":"sap/m/flexibility/Button","sap.m.CheckBox":"sap/m/flexibility/CheckBox","sap.m.ColumnListItem":{"hideControl":"default","unhideControl":"default"},"sap.m.CustomListItem":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.DatePicker":{"hideControl":"default","unhideControl":"default"},"sap.m.Dialog":"sap/m/flexibility/Dialog","sap.m.FlexBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.HBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.IconTabBar":{"moveControls":"default"},"sap.m.IconTabFilter":"sap/m/flexibility/IconTabFilter","sap.m.Image":{"hideControl":"default","unhideControl":"default"},"sap.m.Input":{"hideControl":"default","unhideControl":"default"},"sap.m.InputBase":{"hideControl":"default","unhideControl":"default"},"sap.m.InputListItem":"sap/m/flexibility/InputListItem","sap.m.Label":"sap/m/flexibility/Label","sap.m.MultiInput":{"hideControl":"default","unhideControl":"default"},"sap.m.ListItemBase":{"hideControl":"default","unhideControl":"default"},"sap.m.Link":{"hideControl":"default","unhideControl":"default"},"sap.m.List":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.ListBase":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.MaskInput":{"hideControl":"default","unhideControl":"default"},"sap.m.MenuButton":"sap/m/flexibility/MenuButton","sap.m.OverflowToolbar":"sap/m/flexibility/OverflowToolbar","sap.m.Page":"sap/m/flexibility/Page","sap.m.Panel":"sap/m/flexibility/Panel","sap.m.Popover":"sap/m/flexibility/Popover","sap.m.RadioButton":"sap/m/flexibility/RadioButton","sap.m.RatingIndicator":{"hideControl":"default","unhideControl":"default"},"sap.m.RangeSlider":{"hideControl":"default","unhideControl":"default"},"sap.m.ScrollContainer":{"hideControl":"default","moveControls":"default","unhideControl":"default"},"sap.m.Slider":{"hideControl":"default","unhideControl":"default"},"sap.m.StandardListItem":"sap/m/flexibility/StandardListItem","sap.m.Table":"sap/m/flexibility/Table","sap.m.Column":{"hideControl":"default","unhideControl":"default"},"sap.m.Text":"sap/m/flexibility/Text","sap.m.Title":"sap/m/flexibility/Title","sap.m.Toolbar":"sap/m/flexibility/Toolbar","sap.m.VBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});var t=sap.m;t.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};t.BarDesign={Auto:"Auto",Header:"Header",SubHeader:"SubHeader",Footer:"Footer"};t.ButtonType={Default:"Default",Back:"Back",Accept:"Accept",Reject:"Reject",Transparent:"Transparent",Ghost:"Ghost",Up:"Up",Unstyled:"Unstyled",Emphasized:"Emphasized"};t.CarouselArrowsPlacement={Content:"Content",PageIndicator:"PageIndicator"};t.PlanningCalendarBuiltInView={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};t.OnePersonCalendarView={Day:"Day",WorkWeek:"Work Week",Week:"Week"};t.DateTimeInputType={Date:"Date",DateTime:"DateTime",Time:"Time"};t.DialogType={Standard:"Standard",Message:"Message"};t.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};t.DraftIndicatorState={Clear:"Clear",Saving:"Saving",Saved:"Saved"};t.FacetFilterListDataType={Date:"Date",DateTime:"DateTime",Time:"Time",Integer:"Integer",Float:"Float",String:"String",Boolean:"Boolean"};t.FacetFilterType={Simple:"Simple",Light:"Light"};t.FlexAlignItems={Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};t.FlexAlignSelf={Auto:"Auto",Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};t.FlexDirection={Row:"Row",Column:"Column",RowReverse:"RowReverse",ColumnReverse:"ColumnReverse",Inherit:"Inherit"};t.FlexJustifyContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Inherit:"Inherit"};t.FlexWrap={NoWrap:"NoWrap",Wrap:"Wrap",WrapReverse:"WrapReverse"};t.FlexAlignContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Stretch:"Stretch",Inherit:"Inherit"};t.FlexRendertype={Div:"Div",List:"List",Bare:"Bare"};t.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto"};t.LinkConversion={None:"None",ProtocolOnly:"ProtocolOnly",All:"All"};t.InputTextFormatMode={Value:"Value",Key:"Key",ValueKey:"ValueKey",KeyValue:"KeyValue"};t.GenericTileMode={ContentMode:"ContentMode",HeaderMode:"HeaderMode",LineMode:"LineMode"};t.GenericTileScope={Display:"Display",Actions:"Actions"};t.TileSizeBehavior={Responsive:"Responsive",Small:"Small"};t.HeaderLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};t.IBarHTMLTag={Div:"Div",Header:"Header",Footer:"Footer"};t.IconTabHeaderMode={Standard:"Standard",Inline:"Inline"};t.IconTabDensityMode={Inherit:"Inherit",Compact:"Compact",Cozy:"Cozy"};t.IconTabFilterDesign={Horizontal:"Horizontal",Vertical:"Vertical"};t.ImageMode={Image:"Image",Background:"Background"};t.Size={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto",Responsive:"Responsive"};t.ValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error"};t.ValueCSSColor=a.createType('sap.m.ValueCSSColor',{isValid:function(v){var r=t.ValueColor.hasOwnProperty(v);if(r){return r;}else{r=b.CSSColor.isValid(v);if(r){return r;}else{var P=sap.ui.requireSync("sap/ui/core/theming/Parameters");return b.CSSColor.isValid(P.get(v));}}}},a.getType('string'));t.InputType={Text:"Text",Date:"Date",Datetime:"Datetime",DatetimeLocale:"DatetimeLocale",Email:"Email",Month:"Month",Number:"Number",Tel:"Tel",Time:"Time",Url:"Url",Week:"Week",Password:"Password"};t.LabelDesign={Bold:"Bold",Standard:"Standard"};t.ListHeaderDesign={Standard:"Standard",Plain:"Plain"};t.ListMode={None:"None",SingleSelect:"SingleSelect",SingleSelectLeft:"SingleSelectLeft",SingleSelectMaster:"SingleSelectMaster",MultiSelect:"MultiSelect",Delete:"Delete"};t.ListKeyboardMode={Navigation:"Navigation",Edit:"Edit"};t.ListGrowingDirection={Downwards:"Downwards",Upwards:"Upwards"};t.ListSeparators={All:"All",Inner:"Inner",None:"None"};t.ListType={Inactive:"Inactive",Detail:"Detail",Navigation:"Navigation",Active:"Active",DetailAndActive:"DetailAndActive"};t.SelectListKeyboardNavigationMode={None:"None",Delimited:"Delimited"};t.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};t.MenuButtonMode={Regular:"Regular",Split:"Split"};t.OverflowToolbarPriority={NeverOverflow:"NeverOverflow",Never:"Never",High:"High",Low:"Low",Disappear:"Disappear",AlwaysOverflow:"AlwaysOverflow",Always:"Always"};t.P13nPanelType={sort:"sort",filter:"filter",group:"group",columns:"columns",dimeasure:"dimeasure",selection:"selection"};t.PageBackgroundDesign={Standard:"Standard",List:"List",Solid:"Solid",Transparent:"Transparent"};t.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};sap.m.PDFViewerDisplayTypes={Auto:"auto",Embedded:"embedded",Link:"link"};t.PlacementType={Left:"Left",Right:"Right",Top:"Top",Bottom:"Bottom",Vertical:"Vertical",VerticalPreferedTop:"VerticalPreferedTop",VerticalPreferredTop:"VerticalPreferredTop",VerticalPreferedBottom:"VerticalPreferedBottom",VerticalPreferredBottom:"VerticalPreferredBottom",Horizontal:"Horizontal",HorizontalPreferedRight:"HorizontalPreferedRight",HorizontalPreferredRight:"HorizontalPreferredRight",HorizontalPreferedLeft:"HorizontalPreferedLeft",HorizontalPreferredLeft:"HorizontalPreferredLeft",PreferredLeftOrFlip:"PreferredLeftOrFlip",PreferredRightOrFlip:"PreferredRightOrFlip",PreferredTopOrFlip:"PreferredTopOrFlip",PreferredBottomOrFlip:"PreferredBottomOrFlip",Auto:"Auto"};t.QuickViewGroupElementType={phone:"phone",mobile:"mobile",email:"email",link:"link",text:"text",pageLink:"pageLink"};t.VerticalPlacementType={Top:"Top",Bottom:"Bottom",Vertical:"Vertical"};t.PopinDisplay={Block:"Block",Inline:"Inline",WithoutHeader:"WithoutHeader"};t.PopinLayout={Block:"Block",GridSmall:"GridSmall",GridLarge:"GridLarge"};t.Sticky={ColumnHeaders:"ColumnHeaders",HeaderToolbar:"HeaderToolbar",InfoToolbar:"InfoToolbar"};t.RatingIndicatorVisualMode={Full:"Full",Half:"Half"};t.ScreenSize={Phone:"Phone",Tablet:"Tablet",Desktop:"Desktop",XXSmall:"XXSmall",XSmall:"XSmall",Small:"Small",Medium:"Medium",Large:"Large",XLarge:"XLarge",XXLarge:"XXLarge"};t.SelectionDetailsActionLevel={Item:"Item",List:"List",Group:"Group"};t.SelectType={Default:"Default",IconOnly:"IconOnly"};t.SplitAppMode={ShowHideMode:"ShowHideMode",StretchCompressMode:"StretchCompressMode",PopoverMode:"PopoverMode",HideMode:"HideMode"};t.StandardTileType={Create:"Create",Monitor:"Monitor",None:"None"};t.semantic=t.semantic||{};t.semantic.SemanticRuleSetType={Classic:"Classic",Optimized:"Optimized"};t.ObjectMarkerType={Flagged:"Flagged",Favorite:"Favorite",Draft:"Draft",Locked:"Locked",Unsaved:"Unsaved",LockedBy:"LockedBy",UnsavedBy:"UnsavedBy"};t.ObjectMarkerVisibility={IconOnly:"IconOnly",TextOnly:"TextOnly",IconAndText:"IconAndText"};t.SwipeDirection={LeftToRight:"LeftToRight",RightToLeft:"RightToLeft",Both:"Both"};t.SwitchType={Default:"Default",AcceptReject:"AcceptReject"};t.ToolbarDesign={Auto:"Auto",Transparent:"Transparent",Info:"Info",Solid:"Solid"};t.ToolbarStyle={Standard:"Standard",Clear:"Clear"};t.TimePickerMaskMode={On:"On",Off:"Off"};t.StringFilterOperator={Equals:"Equals",Contains:"Contains",StartsWith:"StartsWith",AnyWordStartsWith:"AnyWordStartsWith"};t.LightBoxLoadingStates={Loading:"LOADING",Loaded:"LOADED",TimeOutError:"TIME_OUT_ERROR",Error:"ERROR"};t.StepInputValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};t.StepInputStepModeType={AdditionAndSubtraction:"AdditionAndSubtraction",Multiple:"Multiple"};sap.ui.lazyRequire("sap.m.MessageToast","show");sap.ui.lazyRequire("sap.m.routing.RouteMatchedHandler");sap.ui.lazyRequire("sap.m.routing.Router");sap.ui.lazyRequire("sap.m.routing.Target");sap.ui.lazyRequire("sap.m.routing.TargetHandler");sap.ui.lazyRequire("sap.m.routing.Targets");if(D.os.ios&&D.os.version>=7&&D.os.version<8&&D.browser.name==="sf"){sap.ui.requireSync("sap/m/ios7");}if(/sap-ui-xx-formfactor=compact/.test(location.search)){q("html").addClass("sapUiSizeCompact");t._bSizeCompact=true;}if(/sap-ui-xx-formfactor=condensed/.test(location.search)){q("html").addClass("sapUiSizeCondensed");t._bSizeCondensed=true;}t.getInvalidDate=function(){return null;};t.getLocale=function(){var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();t.getLocale=function(){return l;};return l;};t.getLocaleData=function(){var l=sap.ui.requireSync("sap/ui/core/LocaleData").getInstance(t.getLocale());t.getLocaleData=function(){return l;};return l;};t.isDate=function(v){return v&&Object.prototype.toString.call(v)=="[object Date]"&&!isNaN(v);};t.getIScroll=function(c){if(typeof window.iScroll!="function"||!(c instanceof C)){return;}var p,s;for(p=c;p=p.oParent;){s=p.getScrollDelegate?p.getScrollDelegate()._scroller:null;if(s&&s instanceof window.iScroll){return s;}}};t.getScrollDelegate=function(o,G){if(!(o instanceof C)){return;}var U=sap.ui.require("sap/ui/core/UIComponent");function h(c){if(!c){return;}return G&&U&&(c instanceof U)?c.oContainer:c.oParent;}for(var p=o;p=h(p);){if(p&&typeof p.getScrollDelegate=="function"){return p.getScrollDelegate();}}};t.ScreenSizes={phone:240,tablet:600,desktop:1024,xxsmall:240,xsmall:320,small:480,medium:560,large:768,xlarge:960,xxlarge:1120};f(t,"BaseFontSize",function(){t.BaseFontSize=q(document.documentElement).css("font-size")||"16px";return t.BaseFontSize;});t.closeKeyboard=function(){var c=document.activeElement;if(!D.system.desktop&&c&&/(INPUT|TEXTAREA)/i.test(c.tagName)){c.blur();}};t.touch=t.touch||{};t.touch.find=function(T,o){var i,c;if(!T){return;}if(o&&typeof o.identifier!=="undefined"){o=o.identifier;}else if(typeof o!=="number"){e(false,'sap.m.touch.find(): oTouch must be a touch object or a number');return;}c=T.length;for(i=0;i<c;i++){if(T[i].identifier===o){return T[i];}}};t.touch.countContained=function(T,v){var i,c=0,h,j,$;if(!T){return 0;}if(v instanceof Element){v=q(v);}else if(typeof v==="string"){v=q(document.getElementById(v));}else if(!(v instanceof q)){e(false,'sap.m.touch.countContained(): vElement must be a jQuery object or Element reference or a string');return 0;}j=v.children().length;h=T.length;for(i=0;i<h;i++){$=q(T[i].target);if((j===0&&$.is(v))||(v[0].contains($[0]))){c++;}}return c;};t.URLHelper=(function(){function i(v){return v&&Object.prototype.toString.call(v)=="[object String]";}function c(T){if(!i(T)){return"";}return T.replace(/[^0-9\+\*#]/g,"");}function h(T){if(!i(T)){return"";}T=T.split(/\r\n|\r|\n/g).join("\r\n");return encodeURIComponent(T);}return q.extend(new E(),{normalizeTel:function(T){return"tel:"+c(T);},normalizeSms:function(T){return"sms:"+c(T);},normalizeEmail:function(s,S,B,j,k){var p=[],u="mailto:",l=encodeURIComponent;i(s)&&(u+=l(q.trim(s)));i(S)&&p.push("subject="+l(S));i(B)&&p.push("body="+h(B));i(k)&&p.push("bcc="+l(q.trim(k)));i(j)&&p.push("cc="+l(q.trim(j)));if(p.length){u+="?"+p.join("&");}return u;},redirect:function(u,n){e(i(u),this+"#redirect: URL must be a string");this.fireEvent("redirect",u);if(!n){window.location.href=u;}else{var w=window.open(u,"_blank");if(!w){L.error(this+"#redirect: Could not open "+u);if(D.os.windows_phone||(D.browser.edge&&D.browser.mobile)){L.warning("URL will be enforced to open in the same window as a fallback from a known Windows Phone system restriction. Check the documentation for more information.");window.location.href=u;}}}},attachRedirect:function(F,l){return this.attachEvent("redirect",F,l);},detachRedirect:function(F,l){return this.detachEvent("redirect",F,l);},triggerTel:function(T){this.redirect(this.normalizeTel(T));},triggerSms:function(T){this.redirect(this.normalizeSms(T));},triggerEmail:function(s,S,B,j,k){this.redirect(this.normalizeEmail.apply(0,arguments));},toString:function(){return"sap.m.URLHelper";}});}());t.BackgroundHelper={addBackgroundColorStyles:function(r,B,s,c){r.addClass(c||"sapUiGlobalBackgroundColor");if(B||s){r.addStyle("background-image","none");r.addStyle("filter","none");}if(B){r.addStyle("background-color",g(B));}},renderBackgroundImageTag:function(r,c,v,B,R,o){r.write("<div id='"+c.getId()+"-BG' ");if(Array.isArray(v)){for(var i=0;i<v.length;i++){r.addClass(v[i]);}}else{r.addClass(v);}r.addClass("sapUiGlobalBackgroundImage");if(B){r.addStyle("display","block");r.addStyle("background-image","url("+g(B)+")");r.addStyle("background-repeat",R?"repeat":"no-repeat");if(!R){r.addStyle("background-size","cover");r.addStyle("background-position","center");}else{r.addStyle("background-position","left top");}}if(o!==1){if(o>1){o=1;}r.addStyle("opacity",o);}r.writeClasses(false);r.writeStyles();r.write("></div>");}};t.ImageHelper=(function(){function c(o,p,v){if(v!==undefined){var s=o['set'+d(p)];if(typeof(s)==="function"){s.call(o,v);return true;}}return false;}var i={getImageControl:function(I,o,p,P,h,j){e(P.src,"sap.m.ImageHelper.getImageControl: mProperties do not contain 'src'");if(o&&(o.getSrc()!=P.src)){o.destroy();o=undefined;}if(o&&(o instanceof sap.m.Image||o instanceof sap.ui.core.Icon)){for(var m in P){c(o,m,P[m]);}}else{var n=sap.ui.require("sap/m/Image")||sap.ui.requireSync("sap/m/Image");var s=Object.assign({},P,{id:I});o=sap.ui.core.IconPool.createControlByURI(s,n);o.setParent(p,null,true);}if(j){for(var l=0,r=j.length;l!==r;l++){o.removeStyleClass(j[l]);}}if(h){for(var k=0,u=h.length;k!==u;k++){o.addStyleClass(h[k]);}}return o;}};return i;}());t.PopupHelper={calcPercentageSize:function(p,B){if(typeof p!=="string"){L.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+p+"isn't with type string");return null;}if(p.indexOf("%")<=0){L.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+p+"is not a percentage string (for example '25%')");return null;}var P=parseFloat(p)/100,c=parseFloat(B);return Math.floor(P*c)+"px";}};t.InputODataSuggestProvider=(function(){var _=function(o){var h=o.getSource();var v=h.data(h.getId()+"-#valueListAnnotation");var m=h.getModel();var i=h.getBinding("value");var s=m.resolve(i.getPath(),i.getContext());if(!v){return;}var r=o.getParameter("selectedRow");q.each(r.getCells(),function(j,k){var l=k.getBinding("text");q.each(v.outParameters,function(K,n){if(!n.displayOnly&&n.value==l.getPath()){var V=l.getValue();var p=m.resolve(K,i.getContext());if(V&&p!==s){m.setProperty(p,V);}}});});return true;};var c=function(o,r){var M=o.getModel();var h=M.oMetadata;var p=M.resolve(o.getBindingPath("value"),o.getBindingContext());var v={};v.searchSupported=false;v.collectionPath="";v.outParameters={};v.inParameters={};v.selection=[];var A=M.getProperty(p+"/#com.sap.vocabularies.Common.v1.ValueList");if(!A){return false;}var P=p.substr(p.lastIndexOf('/')+1);v.inProperty=P;q.each(A.record,function(i,l){q.each(l,function(j,n){if(n.property==="SearchSupported"&&n.bool){v.searchSupported=true;}if(n.property==="CollectionPath"){v.collectionPath=n.string;}if(n.property==="Parameters"){q.each(n.collection.record,function(k,R){if(R.type==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){var s;q.each(R.propertyValue,function(m,u){if(u.property==="LocalDataProperty"){s=u.propertyPath;}});q.each(R.propertyValue,function(m,u){if(u.property==="ValueListProperty"){v.inParameters[s]={value:u.string};}});}else if(R.type==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"){var s;q.each(R.propertyValue,function(m,u){if(u.property==="LocalDataProperty"){s=u.propertyPath;}});q.each(R.propertyValue,function(m,u){if(u.property==="ValueListProperty"){v.outParameters[s]={value:u.string};v.inParameters[s]={value:u.string};}});}else if(R.type==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){var s;q.each(R.propertyValue,function(m,u){if(u.property==="LocalDataProperty"){s=u.propertyPath;}});q.each(R.propertyValue,function(m,u){if(u.property==="ValueListProperty"){v.outParameters[s]={value:u.string};}});}else if(R.type==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){var s;q.each(R.propertyValue,function(m,u){if(u.property==="ValueListProperty"){v.outParameters[u.string]={value:u.string,displayOnly:true};}});}});}});});v.resultEntity=h._getEntityTypeByPath("/"+v.collectionPath);v.listItem=new sap.m.ColumnListItem();q.each(v.outParameters,function(k,i){v.listItem.addCell(new sap.m.Text({text:"{"+i.value+"}",wrapping:false}));o.addSuggestionColumn(new sap.m.Column({header:new sap.m.Text({text:"{/#"+v.resultEntity.name+"/"+i.value+"/@sap:label}",wrapping:false})}));v.selection.push(i.value);});o.data(o.getId()+"-#valueListAnnotation",v);if(r){o.attachSuggestionItemSelected(_);}};var I={suggest:function(o,r,R,l){var v,h=o.getSource();r=r===undefined?true:r;R=R===undefined?true:R;if(!h.data(h.getId()+"-#valueListAnnotation")){c(h,R);}v=h.data(h.getId()+"-#valueListAnnotation");if(!v){return;}var i=function(o){var B=this.getLength();if(B&&B<=l){h.setShowTableSuggestionValueHelp(false);}else{h.setShowTableSuggestionValueHelp(true);}};if(v.searchSupported){var F=[];var s,j={};if(r){q.each(v.inParameters,function(k,m){if(k==v.inProperty){s=m.value;}else if(r){var V=h.getModel().getProperty(k,h.getBinding("value").getContext());if(V){F.push(new sap.ui.model.Filter(m.value,sap.ui.model.FilterOperator.StartsWith,V));}}});}j.search=o.getParameter("suggestValue");if(v.inParameters.length){if(s){j["search-focus"]=s;}else{e(false,'no search-focus defined');}}h.bindAggregation("suggestionRows",{path:"/"+v.collectionPath,length:l,filters:F,parameters:{select:v.selection.join(','),custom:j},events:{dataReceived:i},template:v.listItem});}else{var F=[];q.each(v.inParameters,function(k,m){if(k==v.inProperty){F.push(new sap.ui.model.Filter(m.value,sap.ui.model.FilterOperator.StartsWith,o.getParameter("suggestValue")));}else if(r){var V=h.getModel().getProperty(k,h.getBinding("value").getContext());if(V){F.push(new sap.ui.model.Filter(m.value,sap.ui.model.FilterOperator.StartsWith,V));}}});h.bindAggregation("suggestionRows",{path:"/"+v.collectionPath,filters:F,template:v.listItem,length:l,parameters:{select:v.selection.join(',')},events:{dataReceived:i}});}}};return I;}());O.set("sap.ui.layout.form.FormHelper",{createLabel:function(T){return new sap.m.Label({text:T});},createButton:function(i,p,c){var h=this;var _=function(j){var o=new j(i,{type:t.ButtonType.Transparent});o.attachEvent('press',p,h);c.call(h,o);};var B=sap.ui.require("sap/m/Button");if(B){_(B);}else{sap.ui.require(["sap/m/Button"],_);}},setButtonContent:function(B,T,s,i,I){B.setText(T);B.setTooltip(s);B.setIcon(i);B.setActiveIcon(I);},addFormClass:function(){return"sapUiFormM";},setToolbar:function(T){var o=this.getToolbar();if(o&&o.setDesign){o.setDesign(o.getDesign(),true);}if(T&&T.setDesign){T.setDesign(sap.m.ToolbarDesign.Transparent,true);}return T;},bArrowKeySupport:false,bFinal:true});O.set("sap.ui.unified.FileUploaderHelper",{createTextField:function(i){var T=new sap.m.Input(i);return T;},setTextFieldContent:function(T,w){T.setWidth(w);},createButton:function(){var B=new sap.m.Button();return B;},addFormClass:function(){return"sapUiFUM";},bFinal:true});O.set("sap.ui.unified.ColorPickerHelper",{isResponsive:function(){return true;},factory:{createLabel:function(c){return new sap.m.Label(c);},createInput:function(i,c){return new sap.m.InputBase(i,c);},createSlider:function(i,c){return new sap.m.Slider(i,c);},createRadioButtonGroup:function(c){return new sap.m.RadioButtonGroup(c);},createRadioButtonItem:function(c){return new sap.m.RadioButton(c);}},bFinal:true});O.set("sap.ui.table.TableHelper",{createLabel:function(c){return new sap.m.Label(c);},createTextView:function(c){return new sap.m.Label(c);},addTableClass:function(){return"sapUiTableM";},bFinal:true});O.set("sap.ui.layout.GridHelper",{getLibrarySpecificClass:function(){return"";},bFinal:true});if(D.os.blackberry||D.os.android&&D.os.version>=4){q(window).on("resize",function(){var A=document.activeElement;var T=A?A.tagName:"";if(T=="INPUT"||T=="TEXTAREA"){setTimeout(function(){A.scrollIntoViewIfNeeded();},0);}});}if(!Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1;}return t;});
