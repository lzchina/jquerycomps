(function(e,t){e(["JC.common"],function(){return function(e){function t(n){var r=[];return n&&(n=e(n)),t.isSelect(n)?r.push(new i(n)):n&&n.length&&n.find("select[defaultselect]").each(function(){r.push(new i(e(this)))}),r}function i(e){if(t.getInstance(e))return t.getInstance(e);t.getInstance(e,this),this._model=new s(e),this._view=new o(this._model,this),this._init()}function s(e){this._selector=e,this._items=[],this._isInited=!1,this._init()}function o(e,t){this._model=e,this._control=t,this._init()}window.JC=window.JC||{log:function(){}},JC.AutoSelect=t,JC.Form&&(JC.Form.initAutoSelect=t);var n={isSelect:function(t){var n;return t&&(t=e(t))&&t.is("select")&&t.is("[defaultselect]")&&(n=!0),n},hideEmpty:!1,dataFilter:null,beforeInited:null,inited:null,change:null,allChanged:null,triggerInitChange:!0,randomurl:!1,processUrl:null,ignoreInitRequest:!1,getInstance:function(t,n){var r;return t&&(t=e(t))&&(typeof n!="undefined"&&t.data("SelectIns",n),r=t.data("SelectIns")),r},removeItems:function(e){var t=e.find("> option:not([defaultoption])"),n=t.length;return t.remove(),n}};for(var r in n)t[r]=n[r];i.prototype={_init:function(){var n=this;return e.each(n._model.items(),function(r,i){t.getInstance(e(i),n)}),n._model.beforeInited()&&n.on("SelectBeforeInited",n._model.beforeInited()),n.on("SelectInited",function(){if(n._model.isInited())return;var t=n._model.first();while(n._model.next(t))t.on("change",n._responeChange),t=n._model.next(t);n._model.items().length&&e(n._model.items()[n._model.items().length-1]).on("change",function(e){n.trigger("SelectAllChanged")}),n._model.isInited(!0),n._model.inited()&&n._model.inited().call(n,n._model.items())}),n.on("SelectChange",function(e,t){n._model.change(t)&&n._model.change(t).call(t,e,n)}),n._model.allChanged()&&n.on("SelectAllChanged",function(e){n._model.allChanged().call(n,n._model.items())}),n.trigger("SelectBeforeInited"),n._model.selectignoreinitrequest()?(n._model.triggerInitChange()&&n._model.first().trigger("change"),n.trigger("SelectAllChanged"),n.trigger("SelectInited")):n._update(n._model.first(),n._firstInitCb),n},on:function(t,n){return e(this).on(t,n),this},trigger:function(t,n){return e(this).trigger(t,n),this},first:function(){return this._model.first()},last:function(){return this._model.last()},items:function(){return this._model.items()},isFirst:function(e){return this._model.isFirst(e)},isLast:function(e){return this._model.isLast(e)},isInited:function(){return this._model.isInited()},data:function(e){return this._model.data(e)},update:function(t){if(!t||!t.length)return this;if(typeof t=="string"){var n=t.replace(/[\s]+/g,"").trim();if(!n)return this;t=n.split(",")}var r=this,i=r._model.items();if(!i||!i.length)return;return e.each(t,function(t,n){if(!i[t])return;e(i[t]).attr("selectvalue",(n.toString()||"").trim())}),r._update(r._model.first(),r._changeCb),this},_responeChange:function(n,r){var i=e(this),s=t.getInstance(i),o=s._model.next(i),u=i.val();if(r)return;JC.log("_responeChange:",i.attr("name"),u),!o||!o.length?s.trigger("SelectChange"):s._update(o,s._changeCb,u)},_update:function(e,t,n,r){return this._model.isStatic(e)?this._updateStatic(e,t,n):this._model.isAjax(e)?this._updateAjax(e,t,n,r):this._updateNormal(e,t,n),this},_updateAjax:function(t,n,r,i){var o=this,u,a=o._model.next(t),f,l;if(o._model.isFirst(t))typeof r=="undefined"&&(r=o._model.selectparentid(t)||""),typeof r!="undefined"&&(f=o._model.selecturl(t,r),l=o._model.token(!0),s.ajaxCache(f)?setTimeout(function(){u=s.ajaxCache(f),o._view.update(t,u),n&&n.call(o,t,u,l)},10):setTimeout(function(){e.get(f,function(r){r=e.parseJSON(r),s.ajaxCache(f,r),o._view.update(t,r),n&&n.call(o,t,r,l)})},10));else{if(typeof i!="undefined"&&i!=o._model.token())return;f=o._model.selecturl(t,r),s.ajaxCache(f)?o._processData(i,t,n,s.ajaxCache(f)):e.get(f,function(r){r=e.parseJSON(r),o._processData(i,t,n,s.ajaxCache(f,r))})}return this},_processData:function(e,t,n,r){var i=this;setTimeout(function(){if(typeof e!="undefined"&&e!=i._model.token())return;i._view.update(t,r),n&&n.call(i,t,r,e)},10)},_changeCb:function(e,t,n){var r=this,i=r._model.next(e),s=r._model.token();if(typeof n!="undefined"&&n!==s)return;return r.trigger("SelectChange",[e]),e.trigger("change",[!0]),r._model.isLast(e),i&&i.length&&r._update(i,r._changeCb,e.val(),n),this},_firstInitCb:function(e,t){var n=this,r=n._model.next(e);return n._model.isInited()||n._model.triggerInitChange()&&e.trigger("change",[!0]),n.trigger("SelectChange",[e]),r&&r.length&&(JC.log("_firstInitCb:",e.val(),r.attr("name"),e.attr("name")),n._update(r,n._firstInitCb,e.val())),n._model.isLast(e)&&(n.trigger("SelectAllChanged"),!n._model.isInited()&&n.trigger("SelectInited")),this},_updateStatic:function(e,t,n){var r=this,i,s=!1;return JC.log("static select"),r._model.isFirst(e)?(typeof n=="undefined"&&(n=r._model.selectparentid(e)||r._model.selectvalue(e)||""),r._model.hasVal(e,n)?(e.val(n),s=!0):typeof n!="undefined"&&(i=r._model.datacb(e)(n))):i=r._model.datacb(e)(n),!s&&r._view.update(e,i),t&&t.call(r,e,i),this},_updateNormal:function(e,t,n){var r=this,i;JC.log("normal select");if(r._model.isFirst(e)){var s=r._model.next(e);typeof n=="undefined"&&(n=r._model.selectvalue(e)||e.val()||""),r._model.hasVal(e,n)&&e.val(n);if(s&&s.length)return r._update(s,t,n),this}else i=r._model.datacb(e)(n);return r._view.update(e,i),t&&t.call(r,e,i),this}},s._ajaxCache={},s.ajaxCache=function(e,t){return t&&(s._ajaxCache[e]=t),s._ajaxCache[e]},s.prototype={_init:function(){return this._findAllItems(this._selector),JC.log("select items.length:",this._items.length),this._initRelationship(),this},token:function(e){return typeof this._token=="undefined"&&(this._token=0),e&&this._token++,this._token},_findAllItems:function(e){this._items.push(e),e.is("[selecttarget]")&&this._findAllItems(JC.f.parentSelector(e,e.attr("selecttarget")))},_initRelationship:function(){this._selector.data("FirstSelect",!0);if(this._items.length>1){this._items[this._items.length-1].data("LastSelect",!0);for(var e=0;e<this._items.length;e++){var t=this._items[e],n=this._items[e-1];n&&(t.data("PrevSelect",n),n.data("NextSelect",t),t.data("parentSelect",n))}}},items:function(){return this._items},first:function(){return this._items[0]},last:function(){return this._items[this._items-1]},next:function(e){return e.data("NextSelect")},prev:function(e){return e.data("PrevSelect")},isFirst:function(e){return!!e.data("FirstSelect")},isLast:function(e){return!!e.data("LastSelect")},isStatic:function(e){return e.is("[selectdatacb]")},isAjax:function(e){return e.is("[selecturl]")},isInited:function(e){return typeof e!="undefined"&&(this._isInited=e),this._isInited},datacb:function(e){var t;return e.attr("selectdatacb")&&(t=window[e.attr("selectdatacb")]),t},selectparentid:function(e){var t;return e.attr("selectparentid")&&(t=e.attr("selectparentid")),e.removeAttr("selectparentid"),t||""},selectvalue:function(e){var t=e.attr("selectvalue");return e.removeAttr("selectvalue"),t||""},randomurl:function(e){var n=t.randomurl;return e.is("[selectrandomurl]")&&(n=JC.f.parseBool(e.attr("selectrandomurl"))),n},selectignoreinitrequest:function(e){var n=t.ignoreInitRequest;return this.first().is("[selectignoreinitrequest]")&&(n=JC.f.parseBool(this.first().attr("selectignoreinitrequest"))),e&&e.is("[selectignoreinitrequest]")&&(n=JC.f.parseBool(e.attr("selectignoreinitrequest"))),n},triggerInitChange:function(){var e=t.triggerInitChange,n=this.first();return n.attr("selecttriggerinitchange")&&(e=JC.f.parseBool(n.attr("selecttriggerinitchange"))),e},hideempty:function(e){var n=t.hideEmpty,r=this.first();return r&&r.length&&r.is("[selecthideempty]")&&(n=JC.f.parseBool(r.attr("selecthideempty"))),e&&e.length&&e.is("[selecthideempty]")&&(n=JC.f.parseBool(e.attr("selecthideempty"))),n},selecturl:function(e,n){var r=t.processUrl,i=e.attr("selecturl")||"";return e.attr("selectprocessurl")&&window[e.attr("selectprocessurl")]&&(r=window[e.attr("selectprocessurl")]),i=JC.f.printf(i,n),this.randomurl(e)&&(i=JC.f.addUrlParams(i,{rnd:(new Date).getTime()})),r&&(i=r.call(e,i,n)),i},_userdatafilter:function(e){var t;return e.attr("selectdatafilter")&&(t=window[e.attr("selectdatafilter")]),t},dataFilter:function(e,n){var r=this._userdatafilter(e)||t.dataFilter;return r&&(n=r(n,e)),n},beforeInited:function(){var e=t.beforeInited,n=this.first();return n.attr("selectbeforeInited")&&window[n.attr("selectbeforeInited")]&&(e=window[n.attr("selectbeforeinited")]),e},inited:function(){var e=t.inited,n=this.first();return n.attr("selectinited")&&window[n.attr("selectinited")]&&(e=window[n.attr("selectinited")]),e},change:function(e){var n=t.change;return e.attr("selectchange")&&window[e.attr("selectchange")]&&(n=window[e.attr("selectchange")]),n},allChanged:function(){var e=t.allChanged,n=this.first();return n.attr("selectallchanged")&&window[n.attr("selectallchanged")]&&(e=window[n.attr("selectallchanged")]),e},data:function(e,t){return typeof t!="undefined"&&e.data("SelectData",t),e.data("SelectData")},hasVal:function(t,n){var r=!1,n=n.toString();return t.find("option").each(function(){var t=e(this);if(t.val()==n)return r=!0,!1}),r}},o.prototype={_init:function(){return this},update:function(n,r){var i=this._model.selectvalue(n);r=this._model.dataFilter(n,r),this._model.data(n,r),this._control.trigger("SelectItemBeforeUpdate",[n,r]),t.removeItems(n);if(!r.length){if(this._model.hideempty(n)){this.hideItem(n),this._control.trigger("SelectItemUpdated",[n,r]);return}}else!n.is(":visible")&&n.show();var s=[],o,u;for(var a=0,f=r.length;a<f;a++)o=r[a],s.push(JC.f.printf('<option value="{0}" {2}>{1}</option>',o[0],o[1],u));e(s.join("")).appendTo(n),this._model.hasVal(n,i)&&n.val(i),this._control.trigger("SelectItemUpdated",[n,r])},hideItem:function(e){e.hide();while(e=this._model.next(e))e.hide()}},e(document).ready(function(e){setTimeout(function(){t(document.body)},200)})}(jQuery),JC.AutoSelect})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);