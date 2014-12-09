(function(e,t){e(["JC.BaseMVC","JC.AutoComplete","JC.AutoSelect"],function(){function e(t){t&&(t=$(t));if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init(),JC.log("AutoSelectComplete inited",(new Date).getTime())}return Bizs.AutoSelectComplete=e,JC.f.addAutoInit&&JC.f.addAutoInit(e),e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.init=function(t){var n=[];return t=$(t||document),t&&t.length&&(t.hasClass(".js_bizAutoSelectComplete")?n.push(new e(t)):t.find("input.js_bizAutoSelectComplete").each(function(){n.push(new e(this))})),n},e.prototype={_beforeInit:function(){JC.log("AutoSelectComplete _beforeInit",(new Date).getTime())},_initHanlderEvent:function(){var e=this;e.on("BASC_SELECT_CHANGED",function(t,n){JC.log("Bizs.AutoSelectComplete all changed",(new Date).getTime()),e.trigger("BASC_ALL_CHANGE",[n]);var r=n.val(),n,r,i;r?JC.AutoComplete.ajaxUpdate(e._model.selector(),JC.f.printf(e._model.bascAjaxUrl(),r),function(t){e.trigger("BASC_CHANGE",[n,r,t]);var i=this;if(e._model.firstUpdate()){e._model.firstUpdate(!1),e.trigger("BASC_FIRST_UPDATE",[t,i]);return}e.trigger("BASC_CLEAR")}):(e.trigger("BASC_CLEAR"),e.trigger("BASC_CHANGE",[n]))}),e.on("BASC_CLEAR",function(){var t=JC.AutoComplete.getInstance(e._model.selector());if(!t)return;t.clear()}),e.on("BASC_ALL_CHANGE",function(t,n){var r=JC.AutoComplete.getInstance(e._model.selector());n.is(":visible")&&n.val()?r?e._model.selector().show():e._model.selector().hide():e._model.selector().hide()}),e.on("BASC_CHANGE",function(t,n,r,i){JC.log("BASC_CHANGE",(new Date).getTime(),r,i);var s=JC.AutoComplete.getInstance(e._model.selector());r&&i&&i.length?e._model.selector().show():(e._model.selector().hide(),JC.log("hide"))}),e.on("BASC_FIRST_UPDATE",function(e,t,n){var r=n.idVal();if(!r)return;$.each(t,function(e,t){if(t.id==r)return n.selector().val(t.label),!1})})},_inited:function(){JC.log("AutoSelectComplete _inited",(new Date).getTime()),this._model.selector().attr("cacDataFilter",e.Model.DATA_FILTER_NAME),this._model.injectDefaultSelectCallback()}},BaseMVC.buildModel(e),e.Model._instanceName="AutoSelectComplete",e.Model.INS_COUNT=1,e.Model.DATA_FILTER_NAME="BizsAutoSelectCompleteDataFilter",e.Model.prototype={init:function(){JC.log("AutoSelectComplete.Model.init:",(new Date).getTime()),this._insCount=e.Model.INS_COUNT++,this._firstUpdate=!0},firstUpdate:function(e){return typeof e!="undefined"&&(this._firstUpdate=e),this._firstUpdate},insCount:function(){return this._insCount},bascDefaultSelect:function(){var e=this.selectorProp("bascDefaultSelect");return e},injectDefaultSelectCallback:function(){var e=this,t=e.callbackProp(e.bascDefaultSelect(),"selectallchanged"),n="AutoSelectComplete_inject_"+e.insCount();if(e.bascDefaultSelect().attr("selectallchanged")==n)return;window[n]=function(n){t&&t.apply(this,JC.f.sliceArgs(arguments)),$(e).trigger("TriggerEvent",["BASC_SELECT_CHANGED",n[n.length-1]])},e.bascDefaultSelect().attr("selectallchanged",n)},bascAjaxUrl:function(){var e=this.attrProp("bascAjaxUrl");return e},bascDefaultLabel:function(){var e=this.attrProp("bascDefaultLabel");return e},bascDefaultId:function(){var e=this.attrProp("bascDefaultId");return e}},BaseMVC.buildView(e),e.View.prototype={init:function(){JC.log("AutoSelectComplete.View.init:",(new Date).getTime())}},BaseMVC.build(e,"Bizs"),window[e.Model.DATA_FILTER_NAME]=function(e){return e.data&&e.data.length&&(e=e.data),$.each(e,function(t,n){n.length&&(e[t]={id:n[0],label:n[1]})}),e},$(document).ready(function(){var t=0;e.autoInit&&(t=e.init())}),Bizs.AutoSelectComplete})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);