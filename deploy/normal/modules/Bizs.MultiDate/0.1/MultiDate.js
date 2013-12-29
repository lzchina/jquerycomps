(function(e,t){e(["JC.BaseMVC","JC.Calendar"],function(){function e(t){if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init()}return window.Bizs.MultiDate=e,e.prototype={_beforeInit:function(){JC.log("MultiDate _beforeInit",(new Date).getTime())},_initHanlderEvent:function(){var e=this;$([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n){var r=JC.f.sliceArgs(arguments);r.shift(),r.shift(),e.trigger(n,r)}),e._initDefaultValue(),e._initHandlerEvent(),e.selector().trigger("change",[!0])},_initDefaultValue:function(){var e=this,t=e._model.qstartdate(),n=e._model.qenddate(),r=e._model.mdCustomStartDate(),i=e._model.mdCustomEndDate();e._model.selector(e._model.qtype()),e._model.mdstartdate(t),e._model.mdenddate(n),e._model.mddate().attr("name")?e._model.mddate(e._model.qdate()):t&&n&&(t==n?e._model.mddate(JC.f.formatISODate(JC.f.parseISODate(t))):e._model.mddate(JC.f.printf("{0} 至 {1}",JC.f.formatISODate(JC.f.parseISODate(t)),JC.f.formatISODate(JC.f.parseISODate(n))))),r&&r.length&&r.val(t?JC.f.formatISODate(JC.f.parseISODate(t)):t),i&&i.length&&i.val(n?JC.f.formatISODate(JC.f.parseISODate(n)):n)},_initHandlerEvent:function(){var e=this;e._model.selector().on("change",function(t,n){var r=$(this),i=r.val().trim().toLowerCase(),s=e._model.mdDefaultBox(),o=e._model.mdCustomBox();JC.log("type:",i);if(i=="custom")s&&o&&s.length&&o.length&&(s.hide(),s.find("input").prop("disabled",!0),o.find("input").prop("disabled",!1),o.show());else{s&&o&&s.length&&o.length&&(o.hide(),o.find("input").prop("disabled",!0),s.find("input").prop("disabled",!1),s.show());if(n)return;e._model.settype(i),setTimeout(function(){JC.Calendar.pickDate(e._model.mddate()[0]),e._model.mdstartdate(""),e._model.mdenddate("")},10)}})},_inited:function(){JC.log("MultiDate _inited",(new Date).getTime())}},e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.isMultiDate=function(e){var t;return e&&(e=$(e)).length&&(t=e.is("[MultiDatelayout]")),t},BaseMVC.buildModel(e),e.Model._instanceName="MultiDate",e.Model._inscount=1,e.Model.prototype={init:function(){var t=this,n="Bizs.MultiDate_"+e.Model._inscount,r="Bizs.MultiDate_show_"+e.Model._inscount,i="Bizs.MultiDate_hide_"+e.Model._inscount,s="Bizs.MultiDate_layoutchange_"+e.Model._inscount;return e.Model._inscount++,window[n]=function(e,n,r){t.mdstartdate(JC.f.formatISODate(e,"")),t.mdenddate(JC.f.formatISODate(n,""))},t.mddate().attr("calendarupdate",n),window[r]=function(){var e=$("body > div.UXCCalendar:visible");e.length&&JC.Tips&&JC.Tips.init(e.find("[title]"))},t.mddate().attr("calendarshow",r),window[i]=function(){JC.Tips&&JC.Tips.hide(),t.updateHiddenDate()},t.mddate().attr("calendarhide",i),window[s]=function(){JC.Tips&&JC.Tips.hide();var e=$("body > div.UXCCalendar:visible");e.length&&JC.Tips&&JC.Tips.init(e.find("[title]"))},t.mddate().attr("calendarlayoutchange",s),t},mdDefaultBox:function(){return this.selectorProp("mdDefaultBox")},mdCustomBox:function(){return this.selectorProp("mdCustomBox")},mdCustomStartDate:function(){return this.selectorProp("mdCustomStartDate")},mdCustomEndDate:function(){return this.selectorProp("mdCustomEndDate")},selector:function(e){return typeof e!="undefined"&&this.hastype(this.qtype())&&this._selector.val(e)&&this.settype(e),this._selector},mddate:function(e){var t=JC.f.parentSelector(this.selector(),this.selector().attr("mddate"));return typeof e!="undefined"&&t.val(e),t},mdstartdate:function(e){var t=JC.f.parentSelector(this.selector(),this.selector().attr("mdstartdate"));return typeof e!="undefined"&&t.val(e.replace(/[^\d]/g,"")),t},mdenddate:function(e){var t=JC.f.parentSelector(this.selector(),this.selector().attr("mdenddate"));return typeof e!="undefined"&&t.val(e.replace(/[^\d]/g,"")),t},qtype:function(){return this.decodedata(JC.f.getUrlParam(this.selector().attr("name")||"")||"").toLowerCase()},qdate:function(){return this.decodedata(JC.f.getUrlParam(this.mddate().attr("name")||"")||"").toLowerCase()},qstartdate:function(){return this.decodedata(JC.f.getUrlParam(this.mdstartdate().attr("name")||"")||"").toLowerCase()},qenddate:function(){return this.decodedata(JC.f.getUrlParam(this.mdenddate().attr("name")||"")||"").toLowerCase()},hastype:function(e){var t=!1;return this.selector().find("> option").each(function(){if($(this).val().trim()==e)return t=!0,!1}),t},settype:function(e){this.mddate().val("").attr("multidate",e)},decodedata:function(e){e=e.replace(/[\+]/g," ");try{e=decodeURIComponent(e)}catch(t){}return e},updateHiddenDate:function(){var e=$.trim(this.mddate().val());if(!e){this.mdstartdate(""),this.mdenddate("");return}e=e.replace(/[^\d]+/g,""),e.length==8&&(this.mdstartdate(e),this.mdenddate(e)),e.length==16&&(this.mdstartdate(e.slice(0,8)),this.mdenddate(e.slice(8)))}},BaseMVC.buildView(e),e.View.prototype={init:function(){return this},hide:function(){},show:function(){}},BaseMVC.build(e,"Bizs"),$(document).ready(function(){$("select.js_autoMultidate").each(function(){new e($(this))})}),Bizs.MultiDate})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);