(function(define,_win){define(["JC.BaseMVC","JC.Panel"],function(){window.Bizs.ActionLogic=ActionLogic;function ActionLogic(_selector){_selector&&(_selector=$(_selector));if(ActionLogic.getInstance(_selector)){return ActionLogic.getInstance(_selector)}ActionLogic.getInstance(_selector,this);this._model=new ActionLogic.Model(_selector);this._view=new ActionLogic.View(this._model);this._init()}!define.amd&&JC.use&&!JC.Panel&&JC.use("Panel");ActionLogic.getInstance=function(_selector,_setter){if(typeof _selector=="string"&&!/</.test(_selector)){_selector=$(_selector)}if(!(_selector&&_selector.length)||(typeof _selector=="string")){return}typeof _setter!="undefined"&&_selector.data("ActionLogicIns",_setter);return _selector.data("ActionLogicIns")};ActionLogic.isActionLogic=function(_selector){var _r;_selector&&(_selector=$(_selector)).length&&(_r=_selector.is("[baltype]"));return _r};ActionLogic.disableButton=function(_selector,_durationMs){_selector&&(_selector=$(_selector));if(!(_selector&&_selector.length)){return}_durationMs=_durationMs||1000;_selector.attr("disabled",true);JC.f.safeTimeout(function(){_selector.attr("disabled",false)},_selector,"DISABLE_BUTTON",_durationMs)};ActionLogic.init=function(_selector){_selector&&$(_selector).find(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join()).on("click",function(_evt){var _p=$(this);ActionLogic.process(_p)&&(_p.prop("nodeName").toLowerCase()=="a"&&_evt.preventDefault())})};ActionLogic.process=function(_selector){_selector=$(_selector);if(!(_selector&&_selector.length)){return null}if(!ActionLogic.isActionLogic(_selector)){return}var _ins=ActionLogic.getInstance(_selector);!_ins&&(_ins=new ActionLogic(_selector));_ins&&_ins.process();return _ins};ActionLogic.random=true;ActionLogic.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var _p=this;_p.on("StaticPanel",function(_evt,_item){_p.trigger("ShowPanel",[JC.f.scriptContent(_item)])});_p.on(ActionLogic.Model.SHOW_PANEL,function(_evt,_html){_html=_p._model.unHtmlEntity(_html);var _pins=JC.Dialog(_html);_pins.on("confirm",function(){if(_p._model.balCallback()&&_p._model.balCallback().call(_p._model.selector(),_pins,_p)){return true}return false})});_p.on("AjaxPanel",function(_evt,_type,_url){if(!(_type&&_url)){return}_p._model.balRandom()&&(_url=JC.f.addUrlParams(_url,{rnd:new Date().getTime()}));$.get(_url).done(function(_d){switch(_type){case ActionLogic.Model.SHOW_PANEL:_p.trigger("ShowPanel",[_d]);break;case ActionLogic.Model.DATA_PANEL:try{_d=$.parseJSON(_d)}catch(ex){}if(_d){if(_d.errorno){_p.trigger("ShowError",[_d.errmsg||"操作失败, 请重试!",1])}else{_p.trigger("ShowPanel",[_d.data])}}break}})});_p.on("Go",function(_evt,_url){if(!_url){return}_p._model.balRandom()&&(_url=JC.f.addUrlParams(_url,{rnd:new Date().getTime()}));JC.f.reloadPage(_url)});_p.on("AjaxAction",function(_evt,_url){if(!_url){return}_p._model.balRandom()&&(_url=JC.f.addUrlParams(_url,{rnd:new Date().getTime()}));if(_p._model.balRequestData()){$[_p._model.balAjaxType()](_url,_p._model.balRequestData()).done(innerDone)}else{$[_p._model.balAjaxType()](_url).done(innerDone)}function innerDone(_d){try{_d=$.parseJSON(_d)}catch(ex){}if(_p._model.balCallback()){_p._model.balCallback().call(_p.selector(),_d,_p)}else{if(_d&&typeof _d!="string"&&"errorno" in _d){if(_d.errorno){_p.trigger("ShowError",[_d.errmsg||"操作失败, 请重试!",1])}else{_p.trigger("ShowSuccess",[_d.errmsg||"操作完成",function(){_p._model.balDoneRemoveSelector()&&_p._model.balDoneRemoveSelector().remove();_p._model.balDoneUrl()&&JC.f.reloadPage(_p._model.balDoneUrl()||location.href)}])}}else{var _msg=JC.f.printf('服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>',_d.replace(/</g,"&lt;").replace(/>/g,"&gt;"));JC.Dialog.alert(_msg,1)}}}});_p.on("ShowError",function(_evt,_msg,_status,_cb){var _panel;switch(_p._model.balErrorPopupType()){case"alert":_panel=JC.alert(_msg,_p._model.selector(),_status||1);_cb&&_panel.on("confirm",function(){_cb()});break;case"msgbox":_panel=JC.msgbox(_msg,_p._model.selector(),_status||1);_cb&&_panel.on("close",function(){_cb()});break;case"dialog.msgbox":_panel=JC.Dialog.msgbox(_msg,_status||1);_cb&&_panel.on("close",function(){_cb()});break;default:_panel=JC.Dialog.alert(_msg,_status||1);_cb&&_panel.on("confirm",function(){_cb()});break}});_p.on("ShowConfirm",function(_evt,_msg,_status,_cb){var _panel;switch(_p._model.balConfirmPopupType()){case"dialog.confirm":_panel=JC.Dialog.confirm(_msg,_status||1);_cb&&_panel.on("confirm",function(){_cb()});break;default:_panel=JC.confirm(_msg,_p._model.selector(),_status||1);_cb&&_panel.on("confirm",function(){_cb()});break}});_p.on("ShowSuccess",function(_evt,_msg,_cb){var _panel;switch(_p._model.balSuccessPopupType()){case"alert":_panel=JC.alert(_msg,_p._model.selector());_cb&&_panel.on("confirm",function(){_cb()});break;case"dialog.alert":_panel=JC.Dialog.alert(_msg);_cb&&_panel.on("confirm",function(){_cb()});break;case"dialog.msgbox":_panel=JC.Dialog.msgbox(_msg);_cb&&_panel.on("close",function(){_cb()});break;default:_panel=JC.msgbox(_msg,_p.selector());_cb&&_panel.on("close",function(){_cb()});break}})},process:function(){var _p=this;JC.hideAllPopup(1);switch(_p._model.baltype()){case"panel":if(_p._model.is("[balPanelTpl]")){_p.trigger("StaticPanel",[_p._model.balPanelTpl()])}else{if(_p._model.is("[balAjaxHtml]")){_p.trigger("AjaxPanel",[ActionLogic.Model.SHOW_PANEL,_p._model.balAjaxHtml()])}else{if(_p._model.is("[balAjaxData]")){_p.trigger("AjaxPanel",[ActionLogic.Model.DATA_PANEL,_p._model.balAjaxData()])}}}break;case"link":if(_p._model.is("[balConfirmMsg]")){_p.trigger("ShowConfirm",[_p._model.balConfirmMsg(),2,function(){_p.trigger("Go",_p._model.balUrl())}])}else{_p.trigger("Go",_p._model.balUrl())}break;case"ajaxaction":if(_p._model.is("[balConfirmMsg]")){var _panel=JC.confirm(_p._model.balConfirmMsg(),_p.selector(),2);_panel.on("confirm",function(){_p.trigger("AjaxAction",_p._model.balUrl())})}else{_p.trigger("AjaxAction",_p._model.balUrl())}break}return this}};JC.BaseMVC.buildModel(ActionLogic);ActionLogic.Model.SHOW_PANEL="ShowPanel";ActionLogic.Model.DATA_PANEL="DataPanel";ActionLogic.Model.prototype={init:function(){},unHtmlEntity:function(_html){var _r=this.boolProp("balUnHtmlEntity");_r&&_html&&($.isArray(_html)&&(_html=_html.join("")))&&(_html=_html.replace(/\&gt;/g,">").replace(/\&amp;/g,"&").replace(/\&lt;/g,"<").replace(/\&quot;/g,'"').replace(/\&nbsp;/g," "));return _html},baltype:function(){return this.stringProp("baltype")},balPanelTpl:function(){var _r,_p=this;_r=_p.selectorProp("balPanelTpl")||_r;return _r},balCallback:function(){var _r,_p=this;_r=_p.callbackProp("balCallback")||_r;return _r},balAjaxHtml:function(){return this.selector().attr("balAjaxHtml")},balAjaxData:function(){return this.selector().attr("balAjaxData")},balRandom:function(){var _r=ActionLogic.random,_p=this;_p.is("[balRandom]")&&(_r=JC.f.parseBool(_p.stringProp("balRandom")));return _r},balRequestData:function(){var _r;if(this.attrProp("balRequestData")){_r=eval("("+this.attrProp("balRequestData")+")");try{}catch(ex){}}return _r},balAjaxType:function(){var _r="get";this.balRequestData()&&(_r="post");_r=this.attrProp("balAjaxType")||_r;return _r},balUrl:function(){var _r="?",_p=this;_p.selector().prop("nodeName").toLowerCase()=="a"&&(_r=_p.selector().attr("href"));_p.is("[balUrl]")&&(_r=_p.selector().attr("balUrl"));return JC.f.urlDetect(_r)},balDoneUrl:function(){var _r=this.attrProp("balDoneUrl");return JC.f.urlDetect(_r)},balDoneRemoveSelector:function(){return this.selectorProp("balDoneRemoveSelector")},balConfirmMsg:function(){var _r="确定要执行吗?";_r=this.selector().attr("balConfirmMsg")||_r;return _r},balErrorPopupType:function(){var _r=this.stringProp("balErrorPopupType")||"dialog";return _r},balSuccessPopupType:function(){var _r=this.stringProp("balSuccessPopupType")||"msgbox";return _r},balConfirmPopupType:function(){var _r=this.stringProp("balConfirmPopupType")||"confirm";return _r}};JC.BaseMVC.buildView(ActionLogic);ActionLogic.View.prototype={init:function(){}};JC.BaseMVC.build(ActionLogic);$(document).ready(function(){$(document).delegate(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join(),"click",function(_evt){var _p=$(this);ActionLogic.process(_p)&&(_p.prop("nodeName").toLowerCase()=="a"&&_evt.preventDefault())})});return Bizs.ActionLogic})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));