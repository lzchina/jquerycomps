(function(e,t){e(["JC.common"],function(){return function(e){function t(e,i,s,o){typeof e=="string"&&(e=e.trim().replace(/[\r\n]+/g,"")),typeof i=="string"&&(i=i.trim().replace(/[\r\n]+/g,"")),typeof s=="string"&&(s=s.trim().replace(/[\r\n]+/g,""));if(t.getInstance(e))return t.getInstance(e);this._model=new n(e,i,s,o),this._view=new r(this._model),this._init()}function n(e,t,n,r){this.selector=e,this.headers=t,this.bodys=n,this.footers=r,this.panel,this._events={},this._init()}function r(e){this._model=e,this._tpl=i,this._init()}window.JC=window.JC||{log:function(){}},window.Panel=JC.Panel=t,t.getInstance=function(t){typeof t=="string"&&!/</.test(t)&&(t=e(t));if(t&&typeof t=="string")return;return e(t).data("PanelInstace")},t.focusButton=!0,t.clickClose=!0,t.autoCloseMs=2e3,t._fixWidth=function(t,n,r,i){var s=e('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+t+"</div>").appendTo("body"),o=s.width()+80;s.remove(),r=r||200,i=i||500,o>i&&(o=i),o<r&&(o=r),n.selector().css("width",o)},t._getButton=function(e){var t=[];return e&&(t.push('<div style="text-align:center" class="UButton"> '),e>=1&&t.push('<button type="button" eventtype="confirm">确定</button>'),e>=2&&t.push('<button type="button" eventtype="cancel">取消</button>'),t.push("</div>")),t.join("")},t.prototype={_init:function(){var e=this;return e._view.getPanel().data("PanelInstace",e),e._model.addEvent("close_default",function(e,t){t._view.close()}),e._model.addEvent("show_default",function(e,t){t._view.show()}),e._model.addEvent("hide_default",function(e,t){t._view.hide()}),e._model.addEvent("confirm_default",function(e,t){t.trigger("close")}),e._model.addEvent("cancel_default",function(e,t){t.trigger("close")}),e._model.panelautoclose()&&e.autoClose(),e},on:function(e,t){return e&&t&&this._model.addEvent(e,t),this},show:function(t,n){var r=this;return setTimeout(function(){switch(typeof t){case"number":switch(t){case 0:r.center()}break;case"object":t=e(t),t.length&&r._view.positionWith(t,n);if(!r._model.bindedPositionWithEvent){r._model.bindedPositionWithEvent=!0;var i=function(){r.positionWith(t,n)};e(window).on("resize",i),r.on("close",function(){r._model.bindedPositionWithEvent=!1,e(window).unbind("resize",i)})}}},10),this.trigger("beforeshow",this._view.getPanel()),this.trigger("show",this._view.getPanel()),this},positionWith:function(t,n){return t=e(t),t&&t.length&&this._view.positionWith(t,n),this},hide:function(){return this.trigger("beforehide",this._view.getPanel()),this.trigger("hide",this._view.getPanel()),this},close:function(){return JC.log("Panel.close"),this.trigger("beforeclose",this._view.getPanel()),this.trigger("close",this._view.getPanel()),this},isClickClose:function(){return this._model.panelclickclose()},clickClose:function(e){return e&&this.layout()&&this.layout().removeAttr("panelclickclose"),!e&&this.layout()&&this.layout().attr("panelclickclose",!0),this},addAutoClose:function(){return this.clickClose.apply(this,JC.f.sliceArgs(arguments)),this},autoClose:function(e,n){typeof e=="number"&&(n=e,e=null);var r=this,i;return n=r._model.panelautoclosems(n),t._autoCloseTimeout&&clearTimeout(t._autoCloseTimeout),r.on("close",function(){t._autoCloseTimeout&&clearTimeout(t._autoCloseTimeout)}),t._autoCloseTimeout=setTimeout(function(){e&&r.on("close",e),r.close()},n),this},focusButton:function(){return this._view.focusButton(),this},dispose:function(){return JC.log("Panel.dispose"),this._view.close(),this},center:function(){return this.trigger("beforecenter",this._view.getPanel()),this._view.center(),this.trigger("center",this._view.getPanel()),this},selector:function(){return this._view.getPanel()},layout:function(){return this._view.getPanel()},find:function(e){return this.layout().find(e)},trigger:function(t,n){JC.log("Panel.trigger",t);var r=this,i=this._model.getEvent(t),s=!0;i&&i.length&&(n&&(n=e(n))&&n.length&&(n=n[0]),e.each(i,function(e,i){if(i.call(n,t,r)===!1)return s=!1}));if(s){var o=this._model.getEvent(t+"_default");o&&o.length&&e.each(o,function(e,i){if(i.call(n,t,r)===!1)return!1})}return this},header:function(e){typeof e!="undefined"&&this._view.getHeader(e);var t=this._view.getHeader();return t&&t.length&&(e=t.html()),e||""},body:function(e){typeof e!="undefined"&&this._view.getBody(e);var t=this._view.getBody();return t&&t.length&&(e=t.html()),e||""},footer:function(e){typeof e!="undefined"&&this._view.getFooter(e);var t=this._view.getFooter();return t&&t.length&&(e=t.html()),e||""},panel:function(e){typeof e!="undefined"&&this._view.getPanel(e);var t=this._view.getPanel();return t&&t.length&&(e=t.html()),e||""},triggerSelector:function(e){return this._model.triggerSelector(e)}},n.prototype={_init:function(){var n=this,r=typeof this.selector!="undefined"?e(this.selector):undefined;t.ignoreClick=!0;if(r&&r.length)this.selector=r,JC.log("user tpl",this.selector.parent().length),this.selector.parent().length||(n.selector.appendTo(e(document.body)),JC.f.autoInit&&JC.f.autoInit(n.selector));else if(!r||r.length===0)this.footers=this.bodys,this.bodys=this.headers,this.headers=this.selector,this.selector=undefined;return setTimeout(function(){t.ignoreClick=!1},1),this},triggerSelector:function(e){return typeof e!="undefined"&&(this._triggerSelector=e),this._triggerSelector},addEvent:function(e,t){if(!e||!t)return;e&&(e=e.toLowerCase()),e in this._events||(this._events[e]=[]),/\_default/i.test(e)?this._events[e].unshift(t):this._events[e].push(t)},getEvent:function(e){return this._events[e]},panelfocusbutton:function(){var e=t.focusButton;return this.panel.is("[panelfocusbutton]")&&(e=JC.f.parseBool(this.panel.attr("panelfocusbutton"))),e},panelclickclose:function(){var e=t.clickClose;return this.panel.is("[panelclickclose]")&&(e=JC.f.parseBool(this.panel.attr("panelclickclose"))),e},panelautoclose:function(){var e;return this.panel.is("[panelautoclose]")&&(e=JC.f.parseBool(this.panel.attr("panelautoclose"))),e},panelautoclosems:function(e){var n=t.autoCloseMs;return this.panel.is("[panelautoclosems]")&&(n=parseInt(this.panel.attr("panelautoclosems"),10)),typeof e=="number"&&(n=e),n}},r.prototype={_init:function(){return this._model.panel||(this._model.selector?this._model.panel=this._model.selector:(this._model.panel=e(this._tpl),this._model.panel.appendTo(document.body),JC.f.autoInit&&JC.f.autoInit(this._model.panel))),this.getHeader(),this.getBody(),this.getFooter(),this},positionWith:function(t,n){if(!t||!t.length)return;this.getPanel().css({left:"-9999px",top:"-9999px",display:"block",position:"absolute"});var r=t.offset(),i=t.prop("offsetWidth"),s=t.prop("offsetHeight"),o=this.getPanel().prop("offsetWidth"),u=this.getPanel().prop("offsetHeight"),a=e(window).width(),f=e(window).height(),l=e(document).scrollTop(),c=e(document).scrollLeft(),h=r.left+c,p=r.top+s+1;if(typeof n!="undefined")switch(n){case"top":p=r.top-u-1,h=r.left+i/2-o/2}var d=l+f-u,v=l;p>d&&(p=r.top-u-1),p<v&&(p=l);var m=c+a-o,g=c;h>m&&(h=c+a-o-1),h<g&&(h=c),this.getPanel().css({left:h+"px",top:p+"px"})},show:function(){this.getPanel().css({"z-index":ZINDEX_COUNT++}).show()},focusButton:function(){if(!this._model.panelfocusbutton())return;var t=this.getPanel().find("input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]");!t.length&&(t=this.getPanel().find("input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]")),t.length&&e(t[0]).focus()},hide:function(){this.getPanel().hide()},close:function(){JC.log("Panel._view.close()"),this.getPanel().remove()},getPanel:function(e){return typeof e!="undefined"&&this.getPanel().html(e),this._model.panel},getHeader:function(t){var n=this.getPanel().find("div.UPContent > div.hd");return typeof t!="undefined"&&(this._model.headers=t),typeof this._model.headers!="undefined"&&(n.length||this.getPanel().find("div.UPContent > div.bd").before(n=e('<div class="hd">弹出框</div>')),n.html(this._model.headers),this._model.headers=undefined),n},getBody:function(e){var t=this.getPanel().find("div.UPContent > div.bd");return typeof e!="undefined"&&(this._model.bodys=e),typeof this._model.bodys!="undefined"&&(t.html(this._model.bodys),this._model.bodys=undefined),t},getFooter:function(t){var n=this.getPanel().find("div.UPContent > div.ft");return typeof t!="undefined"&&(this._model.footers=t),typeof this._model.footers!="undefined"&&(n.length||this.getPanel().find("div.UPContent > div.bd").after(n=e('<div class="ft" ></div>')),n.html(this._model.footers),this._model.footers=undefined),n},center:function(){var t=this.getPanel(),n=t.width(),r=t.height(),i,s,o=e(window).width(),u=e(window).height(),a=e(document).scrollLeft(),f=e(document).scrollTop();t.css({left:"-9999px",top:"-9999px"}).show(),i=(o-n)/2+a,s=(u-r)/2+f,u-r-100>300&&(s-=100),JC.log(u-r/2-100),s+r-f>u&&(JC.log("y overflow"),s=f+u-r);if(s<f||s<0)s=f;t.css({left:i+"px",top:s+"px"}),JC.log(n,r,o,u)}};var i=['<div class="UPanel" style="width: 600px;">','    <div class="UPContent">','        <div class="bd"></div>','        <span class="close" eventtype="close"></span>',"    </div><!--end UPContent-->","</div>"].join("");JC.hideAllPanel=function(n){e("div.UPanel").each(function(){var r=e(this),i=t.getInstance(r);if(!i)return;i.hide(),n&&i.close()})},JC.hideAllPopup=function(n){e("body > div.UPanelPopup_identifer").each(function(){var r=e(this),i=t.getInstance(r);if(!i)return;i.hide(),n&&i.close()})},e(document).delegate("div.UPanel","click",function(t){var n=e(this),r=e(t.target||t.srcElement),i;r&&r.length&&r.is("[eventtype]")&&(i=r.attr("eventtype"),JC.log(i,n.data("PanelInstace")),i&&n.data("PanelInstace")&&n.data("PanelInstace").trigger(i,r,t))}),e(document).delegate("div.UPanel","click",function(n){var r=e(this),i=t.getInstance(r);i&&i.isClickClose()&&n.stopPropagation()}),e(document).on("click",function(n){if(t.ignoreClick)return;e("div.UPanel").each(function(){var n=e(this),r=t.getInstance(n);r&&r.isClickClose()&&r.layout()&&r.layout().is(":visible")&&(r.hide(),r.close())})}),e(document).on("keyup",function(e){var t=e.keyCode;switch(t){case 27:JC.hideAllPanel(1)}});var s={alert:null,confirm:null,msgbox:null,"dialog.alert":null,"dialog.confirm":null,"dialog.msgbox":null,panel:null,dialog:null};e(document).on("click",function(n){var r=e(n.target||n.srcElement),i=r.attr("paneltype"),o=r.attr("panelmsg"),u=r.is("[panelmsgbox]")?JC.f.parentSelector(r,r.attr("panelmsgbox")):null;if(!i||!(o||u&&u.length))return;i=i.toLowerCase();if(!i in s)return;r.prop("nodeName")&&r.prop("nodeName").toLowerCase()=="a"&&n.preventDefault();var a,f=parseInt(r.attr("panelstatus"),10)||0,l=r.attr("panelcallback"),c=r.attr("panelcancelcallback"),h=r.attr("panelclosecallback"),p=parseInt(r.attr("panelbutton"),10)||0,d=r.attr("panelheader")||"",v=r.is("[panelheaderbox]")?JC.f.parentSelector(r,r.attr("panelheaderbox")):null,m=r.attr("panelfooter")||"",g=r.is("[panelfooterbox]")?JC.f.parentSelector(r,r.attr("panelfooterbox")):null,y=r.is("[panelhideclose]")?JC.f.parseBool(r.attr("panelhideclose")):!1;u&&(o=JC.f.scriptContent(u)||o),v&&v.length&&(d=JC.f.scriptContent(v)||m),g&&g.length&&(m=JC.f.scriptContent(g)||m),r.prop("nodeName")&&r.prop("nodeName").toLowerCase()=="a"&&n.preventDefault(),l&&(l=window[l]),h&&(h=window[h]);switch(i){case"alert":JC.alert&&(a=JC.alert(o,r,f));break;case"confirm":JC.confirm&&(a=JC.confirm(o,r,f));break;case"msgbox":JC.msgbox&&(a=JC.msgbox(o,r,f));break;case"dialog.alert":JC.Dialog&&JC.Dialog.alert&&(a=JC.Dialog.alert(o,f));break;case"dialog.confirm":JC.Dialog&&JC.Dialog.confirm&&(a=JC.Dialog.confirm(o,f));break;case"dialog.msgbox":JC.Dialog&&JC.Dialog.msgbox&&(a=JC.Dialog.msgbox(o,f));break;case"panel":case"dialog":var b="";if(i=="panel")a=new t(d,o+t._getButton(p),m);else{if(!JC.Dialog)return;a=JC.Dialog(d,o+t._getButton(p),m)}a.on("beforeshow",function(e,n){!d&&n.find("div.hd").hide(),!d&&n.find("div.ft").hide(),t._fixWidth(o,a),y&&n.find("span.close").hide()}),i=="panel"&&a.show(r,"top")}if(!a)return;/msgbox/i.test(i)?l&&a.on("close",l):l&&a.on("confirm",l),h&&a.on("close",h),c&&a.on("cancel",c),a.triggerSelector(r)})}(jQuery),function(e){JC.msgbox=function(e,n,r,i,s){typeof n=="number"&&(r=n,n=null),typeof i=="number"&&(s=i,i=null);var o=t.popup(JC.msgbox.tpl||t.tpls.msgbox,e,n,r);return i&&o.on("close",i),setTimeout(function(){o.autoClose(s)},1),o},JC.msgbox.tpl,JC.alert=function(e,n,r,i){return typeof n=="number"&&(r=n,n=null),t.popup(JC.alert.tpl||t.tpls.alert,e,n,r,i)},JC.alert.tpl,JC.confirm=function(e,n,r,i,s){typeof n=="number"&&(r=n,n=null);var o=t.popup(JC.confirm.tpl||t.tpls.confirm,e,n,r,i);return o&&s&&o.on("cancel",s),o},JC.confirm.tpl;var t={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(t){var n;t?(t.selector().addClass("UPanelPopup_identifer"),t.selector().data("PopupInstance",t)):(e("body > div.UPanelPopup_identifer").each(function(){var t=e(this),n=Panel.getInstance(t);if(!n)return;n.hide(),n.close()}),e("body > div.UPanel_TMP").remove())},popup:function(n,r,i,s,o){if(!r)return;t.popupIdentifier(),i&&(i=e(i));var n=n.replace(/\{msg\}/g,r).replace(/\{status\}/g,t.getStatusClass(s||"")),u=new JC.Panel(n);return t.popupIdentifier(u),u.selector().data("popupSrc",i),t.fixWidth(r,u),o&&u.on("confirm",o),i||u.center(),u.on("show_default",function(){JC.log("user show_default");if(i&&i.length)return t.showEffect(u,i,function(){u.focusButton()}),!1}),u.on("close_default",function(){return JC.log("user close_default"),i&&i.length?t.hideEffect(u,i,function(){u.selector().remove(),u=null}):u.selector().remove(),!1}),u.on("hide_default",function(){JC.log("user hide_default");if(i&&i.length)return t.hideEffect(u,i,function(){u.selector().hide()}),!1;u.selector().hide()}),i&&i.length&&u.selector().css({left:"-9999px",top:"-9999px"}),u.selector().css("z-index",window.ZINDEX_COUNT++),u.show(),u},hideEffect:function(n,r,i){r&&(r=e(r));if(!r||!r.length){i&&i(n);return}if(!n||!n.selector)return;var s=r.offset(),o=n.selector(),u=o[0];u.interval&&clearInterval(u.interval),u.defaultWidth&&o.width(u.defaultWidth),u.defaultHeight&&o.height(u.defaultHeight);var a=r.width(),f=o.height();u.defaultWidth=o.width(),u.defaultHeight=o.height();var l=t.getLeft(s.left,a,o.width()),c=t.getTop(s.top,r.height(),f);c=c-f-t.yoffset,o.height(0),o.css({left:l+"px"}),u.interval=JC.f.easyEffect(function(e,t){o.css({top:c+e+"px",height:f-e+"px"}),r&&!r.is(":visible")&&(clearInterval(u.interval),i&&i(n)),f===e&&o.hide(),t&&i&&i(n)},f)},showEffect:function(n,r,i){r&&(r=e(r));if(!r||!r.length)return;if(!n||!n.selector)return;var s=r.offset(),o=n.selector(),u=o[0];u.interval&&clearInterval(u.interval),u.defaultWidth&&o.width(u.defaultWidth),u.defaultHeight&&o.height(u.defaultHeight);var a=r.width(),f=o.height();u.defaultWidth=o.width(),u.defaultHeight=o.height();var l=t.getLeft(s.left,a,o.width()),c=t.getTop(s.top,r.height(),f,t.xoffset);o.height(0),o.css({left:l+"px"}),JC.log(c,s.top),c>s.top?u.interval=JC.f.easyEffect(function(e,r){o.css({top:c-f-t.yoffset+"px",height:e+"px"}),r&&i&&i(n)},f):u.interval=JC.f.easyEffect(function(e,r){o.css({top:c-e-t.yoffset+"px",height:e+"px"}),r&&i&&i(n)},f)},onresize:function(e){if(!e.selector().is(":visible"))return;var n=e.selector(),r=n.data("popupSrc");if(!r||!r.length)e.center();else{var i=r.offset(),s=i.top,o=r.height(),u=n.height(),a=0,f=i.left,l=r.width(),c=n.width(),h=0,p=t.getLeft(f,l,c,h)+t.xoffset,d=t.getTop(s,o,u,a)-u-t.yoffset;n.css({left:p+"px",top:d+"px"})}},getTop:function(t,n,r,i){var s=t,o=e(document).scrollTop(),u=e(window).height()-r;return s-r<o&&(s=t+n+r+i),s},getLeft:function(t,n,r,i){i==undefined&&(i=5);var s=t+n/2+i-r/2,o=e(document).scrollLeft(),u=e(window).width()+o-r;return s>u&&(s=u-2),s<o&&(s=o+1),s},fixWidth:function(n,r){var i=e('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+n+"</div>").appendTo("body"),s=i.width()+80;i.remove(),s>t.maxWidth&&(s=t.maxWidth),s<t.minWidth&&(s=t.minWidth),r.selector().css("width",s)},getStatusClass:function(e){var t="UPanelSuccess";switch(e){case 0:t="UPanelSuccess";break;case 1:t="UPanelError";break;case 2:t="UPanelAlert"}return t},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};e(window).on("resize",function(n){e("body > div.UPanelPopup_identifer").each(function(){var n=e(this);n.data("PopupInstance")&&t.onresize(n.data("PopupInstance"))})})}(jQuery),function(e){var t=!!window.ActiveXObject&&!window.XMLHttpRequest,n=window.Dialog=JC.Dialog=function(e,t,n,i){r.timeout&&clearTimeout(r.timeout);if(JC.Panel.getInstance(e))return r.timeout=setTimeout(function(){JC.Panel.getInstance(e).show(0)},r.showMs),JC.Panel.getInstance(e);r.dialogIdentifier();var s=new JC.Panel(e,t,n,i);return r.dialogIdentifier(s),r.showMask(),s.selector().css("z-index",window.ZINDEX_COUNT++),s.on("close_default",function(e,t){r.hideMask()}),s.on("hide_default",function(e,t){r.hideMask()}),s.on("show_default",function(e,t){r.showMask(),setTimeout(function(){r.showMask(),s.selector().css({"z-index":window.ZINDEX_COUNT++,display:"block"})},1)}),r.timeout=setTimeout(function(){s.show(0)},r.showMs),s};JC.Dialog.msgbox=function(e,t,n,i){if(!e)return;var s=(JC.Dialog.msgbox.tpl||r.tpls.msgbox).replace(/\{msg\}/g,e).replace(/\{status\}/g,r.getStatusClass(t||"")),o=JC.Dialog(s);return r.fixWidth(e,o),n&&o.on("close",n),setTimeout(function(){o.autoClose(i)},1),o},JC.Dialog.msgbox.tpl,JC.Dialog.alert=function(e,t,n){if(!e)return;var i=(JC.Dialog.alert.tpl||r.tpls.alert).replace(/\{msg\}/g,e).replace(/\{status\}/g,r.getStatusClass(t||"")),s=JC.Dialog(i);return r.fixWidth(e,s),n&&s.on("confirm",n),s},JC.Dialog.alert.tpl,JC.Dialog.confirm=function(e,t,n,i){if(!e)return;var s=(JC.Dialog.confirm.tpl||r.tpls.confirm).replace(/\{msg\}/g,e).replace(/\{status\}/g,r.getStatusClass(t||"")),o=JC.Dialog(s);return r.fixWidth(e,o),n&&o.on("confirm",n),i&&o.on("cancel",i),o},JC.Dialog.confirm.tpl,JC.Dialog.mask=function(e){!e&&r.showMask(),e&&r.hideMask()};var r={timeout:null,showMs:10,minWidth:180,maxWidth:500,dialogIdentifier:function(t){t?(t.selector().addClass("UPanelDialog_identifer"),t.selector().data("DialogInstance",t)):(r.hideMask(),e("body > div.UPanelDialog_identifer").each(function(){var t=e(this),n=Panel.getInstance(t);if(!n)return;n.hide(),n.close()}),e("body > div.UPanel_TMP").remove())},showMask:function(){var t=e("#UPanelMask"),n=e("#UPanelMaskIfrmae");t.length||(e(r.tpls.mask).appendTo("body"),t=e("#UPanelMask"),n=e("#UPanelMaskIfrmae")),n.show(),t.show(),r.setMaskSizeForIe6(),n.css("z-index",window.ZINDEX_COUNT++),t.css("z-index",window.ZINDEX_COUNT++)},hideMask:function(){var t=e("#UPanelMask"),n=e("#UPanelMaskIfrmae");t.length&&t.hide(),n.length&&n.hide()},setMaskSizeForIe6:function(){var t=e("#UPanelMask"),n=e("#UPanelMaskIfrmae");if(!t.length||!n.length)return;var r={position:"absolute",top:"0px",left:e(document).scrollLeft()+"px",height:e(document).height()+"px",width:e(window).width()+"px"};t.css(r),n.css(r)},getStatusClass:function(e){var t="UPanelSuccess";switch(e){case 0:t="UPanelSuccess";break;case 1:t="UPanelError";break;case 2:t="UPanelAlert"}return t},fixWidth:function(t,n){var i=e('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+t+"</div>").appendTo("body"),s=i.width()+80;s>r.maxWidth&&(s=r.maxWidth),s<r.minWidth&&(s=r.minWidth),n.selector().css("width",s)},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};e(window).on("resize scroll",function(t){e("body > div.UPanelDialog_identifer").each(function(){var n=e(this);if(n.data("DialogInstance")){if(!n.data("DialogInstance").selector().is(":visible"))return;t.type.toLowerCase()=="resize"&&n.data("DialogInstance").center(),r.setMaskSizeForIe6()}})})}(jQuery),JC.Panel})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);