(function(b,a){b(["JC.common"],function(){window.Panel=JC.Panel=d;function d(h,j,k,i){typeof h=="string"&&(h=h.trim().replace(/[\r\n]+/g,""));typeof j=="string"&&(j=j.trim().replace(/[\r\n]+/g,""));typeof k=="string"&&(k=k.trim().replace(/[\r\n]+/g,""));if(d.getInstance(h)){return d.getInstance(h)}this._model=new g(h,j,k,i);this._view=new f(this._model);this._init()}d.getInstance=function(h){if(typeof h=="string"&&!/</.test(h)){h=$(h)}if(h&&typeof h=="string"){return}return $(h).data("PanelInstace")};d.focusButton=true;d.clickClose=true;d.autoCloseMs=2000;d._fixWidth=function(m,l,j,k){var i=$('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+m+"</div>").appendTo("body"),h=i.width()+80;i.remove();j=j||200;k=k||500;h>k&&(h=k);h<j&&(h=j);l.selector().css("width",h)};d._getButton=function(h){var i=[];if(h){i.push('<div style="text-align:center" class="UButton"> ');if(h>=1){i.push('<button type="button" eventtype="confirm">确定</button>')}if(h>=2){i.push('<button type="button" eventtype="cancel">取消</button>')}i.push("</div>")}return i.join("")};d.prototype={_init:function(){var h=this;h._view.getPanel().data("PanelInstace",h);h._model.addEvent("close_default",function(i,j){j._view.close()});h._model.addEvent("show_default",function(i,j){j._view.show()});h._model.addEvent("hide_default",function(i,j){j._view.hide()});h._model.addEvent("confirm_default",function(i,j){j.trigger("close")});h._model.addEvent("cancel_default",function(i,j){j.trigger("close")});h._model.panelautoclose()&&h.autoClose();return h},on:function(i,h){i&&h&&this._model.addEvent(i,h);return this},show:function(i,j){var h=this;setTimeout(function(){switch(typeof i){case"number":switch(i){case 0:h.center();break}break;case"object":i=$(i);i.length&&h._view.positionWith(i,j);if(!h._model.bindedPositionWithEvent){h._model.bindedPositionWithEvent=true;var k=function(){if(!h._view.getPanel().is(":visible")){return}h.positionWith(i,j)};$(window).off("resize",k);$(window).on("resize",k);h.on("close",function(){h._model.bindedPositionWithEvent=false;$(window).off("resize",k)})}break}},10);this.trigger("beforeshow",this._view.getPanel());this.trigger("show",this._view.getPanel());return this},positionWith:function(i,h){i=$(i);i&&i.length&&this._view.positionWith(i,h);return this},hide:function(){this.trigger("beforehide",this._view.getPanel());this.trigger("hide",this._view.getPanel());return this},close:function(){this.trigger("beforeclose",this._view.getPanel());this.trigger("close",this._view.getPanel());return this},isClickClose:function(){return this._model.panelclickclose()},clickClose:function(h){h&&this.layout()&&this.layout().removeAttr("panelclickclose");!h&&this.layout()&&this.layout().attr("panelclickclose",true);return this},addAutoClose:function(){this.clickClose.apply(this,JC.f.sliceArgs(arguments));return this},autoClose:function(i,k){if(typeof i=="number"){k=i;i=null}var h=this,j;k=h._model.panelautoclosems(k);d._autoCloseTimeout&&clearTimeout(d._autoCloseTimeout);h.on("close",function(){d._autoCloseTimeout&&clearTimeout(d._autoCloseTimeout)});d._autoCloseTimeout=setTimeout(function(){i&&h.on("close",i);h.close()},k);return this},focusButton:function(){this._view.focusButton();return this},dispose:function(){this._view.close();return this},center:function(){this.trigger("beforecenter",this._view.getPanel());this._view.center();this.trigger("center",this._view.getPanel());return this},selector:function(){return this._view.getPanel()},layout:function(){return this._view.getPanel()},find:function(h){return this.layout().find(h)},trigger:function(j,m){var h=this,l=this._model.getEvent(j),i=true;if(l&&l.length){m&&(m=$(m))&&m.length&&(m=m[0]);$.each(l,function(o,n){if(n.call(m,j,h)===false){return i=false}})}if(i){var k=this._model.getEvent(j+"_default");if(k&&k.length){$.each(k,function(o,n){if(n.call(m,j,h)===false){return false}})}}return this},header:function(i){if(typeof i!="undefined"){this._view.getHeader(i)}var h=this._view.getHeader();if(h&&h.length){i=h.html()}return i||""},body:function(i){if(typeof i!="undefined"){this._view.getBody(i)}var h=this._view.getBody();if(h&&h.length){i=h.html()}return i||""},footer:function(i){if(typeof i!="undefined"){this._view.getFooter(i)}var h=this._view.getFooter();if(h&&h.length){i=h.html()}return i||""},panel:function(i){if(typeof i!="undefined"){this._view.getPanel(i)}var h=this._view.getPanel();if(h&&h.length){i=h.html()}return i||""},triggerSelector:function(h){return this._model.triggerSelector(h)}};function g(h,j,k,i){this.selector=h;this.headers=j;this.bodys=k;this.footers=i;this.panel;this._events={};this._init()}g.prototype={_init:function(){var h=this,i=typeof this.selector!="undefined"?$(this.selector):undefined;d.ignoreClick=true;if(i&&i.length){this.selector=i;if(!this.selector.parent().length){h.selector.appendTo($(document.body));window.JC.f.jcAutoInitComps&&JC.f.jcAutoInitComps(h.selector)}}else{if(!i||i.length===0){this.footers=this.bodys;this.bodys=this.headers;this.headers=this.selector;this.selector=undefined}}setTimeout(function(){d.ignoreClick=false},1);return this},triggerSelector:function(h){typeof h!="undefined"&&(this._triggerSelector=h);return this._triggerSelector},addEvent:function(i,h){if(!(i&&h)){return}i&&(i=i.toLowerCase());if(!(i in this._events)){this._events[i]=[]}if(/\_default/i.test(i)){this._events[i].unshift(h)}else{this._events[i].push(h)}},getEvent:function(h){return this._events[h]},panelfocusbutton:function(){var h=d.focusButton;if(this.panel.is("[panelfocusbutton]")){h=JC.f.parseBool(this.panel.attr("panelfocusbutton"))}return h},panelclickclose:function(){var h=d.clickClose;if(this.panel.is("[panelclickclose]")){h=JC.f.parseBool(this.panel.attr("panelclickclose"))}return h},panelautoclose:function(){var h;if(this.panel.is("[panelautoclose]")){h=JC.f.parseBool(this.panel.attr("panelautoclose"))}return h},panelautoclosems:function(h){var i=d.autoCloseMs;if(this.panel.is("[panelautoclosems]")){i=parseInt(this.panel.attr("panelautoclosems"),10)}typeof h=="number"&&(i=h);return i}};function f(h){this._model=h;this._tpl=c;this._init()}f.prototype={_init:function(){if(!this._model.panel){if(this._model.selector){this._model.panel=this._model.selector}else{this._model.panel=$(this._tpl);this._model.panel.appendTo(document.body);window.JC.f.jcAutoInitComps&&JC.f.jcAutoInitComps(this._model.panel)}}this.getHeader();this.getBody();this.getFooter();return this},positionWith:function(j,n){if(!(j&&j.length)){return}this.getPanel().css({left:"-9999px",top:"-9999px",display:"block",position:"absolute"});var v=j.offset(),w=j.prop("offsetWidth"),l=j.prop("offsetHeight");var s=this.getPanel().prop("offsetWidth"),p=this.getPanel().prop("offsetHeight");var i=$(window).width(),k=$(window).height();var o=$(document).scrollTop(),m=$(document).scrollLeft();var r=v.left+m,q=v.top+l+1;if(typeof n!="undefined"){switch(n){case"top":q=v.top-p-1;r=v.left+w/2-s/2;break}}var t=o+k-p,x=o;if(q>t){q=v.top-p-1}if(q<x){q=o}var u=m+i-s,h=m;if(r>u){r=m+i-s-1}if(r<h){r=m}this.getPanel().css({left:r+"px",top:q+"px"})},show:function(){this.getPanel().css({"z-index":ZINDEX_COUNT++}).show()},focusButton:function(){if(!this._model.panelfocusbutton()){return}var h=this.getPanel().find("input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]");!h.length&&(h=this.getPanel().find("input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]"));h.length&&$(h[0]).focus()},hide:function(){this.getPanel().hide()},close:function(){this.getPanel().remove()},getPanel:function(h){if(typeof h!="undefined"){this.getPanel().html(h)}return this._model.panel},getHeader:function(h){var i=this.getPanel().find("div.UPContent > div.hd");if(typeof h!="undefined"){this._model.headers=h}if(typeof this._model.headers!="undefined"){if(!i.length){this.getPanel().find("div.UPContent > div.bd").before(i=$('<div class="hd">弹出框</div>'))}i.html(this._model.headers);this._model.headers=undefined}return i},getBody:function(h){var i=this.getPanel().find("div.UPContent > div.bd");if(typeof h!="undefined"){this._model.bodys=h}if(typeof this._model.bodys!="undefined"){i.html(this._model.bodys);this._model.bodys=undefined}return i},getFooter:function(h){var i=this.getPanel().find("div.UPContent > div.ft");if(typeof h!="undefined"){this._model.footers=h}if(typeof this._model.footers!="undefined"){if(!i.length){this.getPanel().find("div.UPContent > div.bd").after(i=$('<div class="ft" ></div>'))}i.html(this._model.footers);this._model.footers=undefined}return i},center:function(){var p=this.getPanel(),o=p.width(),j=p.height(),m,k,h=$(window).width(),l=$(window).height(),n=$(document).scrollLeft(),i=$(document).scrollTop();p.css({left:"-9999px",top:"-9999px"}).show();m=(h-o)/2+n;k=(l-j)/2+i;if((l-j-100)>300){k-=100}if((k+j-i)>l){k=i+l-j}if(k<i||k<0){k=i}p.css({left:m+"px",top:k+"px"})}};var c=['<div class="UPanel" style="width: 600px;">','    <div class="UPContent">','        <div class="bd"></div>','        <span class="close" eventtype="close"></span>',"    </div><!--end UPContent-->","</div>"].join("");JC.hideAllPanel=function(h){$("div.UPanel").each(function(){var i=$(this),j=d.getInstance(i);if(!j){return}j.hide();h&&j.close()})};JC.hideAllPopup=function(h){$("body > div.UPanelPopup_identifer").each(function(){var i=$(this),j=d.getInstance(i);if(!j){return}j.hide();h&&j.close()})};$(document).delegate("div.UPanel","click",function(h){var j=$(this),k=$(h.target||h.srcElement),i;if(k&&k.length&&k.is("[eventtype]")){i=k.attr("eventtype");i&&j.data("PanelInstace")&&j.data("PanelInstace").trigger(i,k,h)}});$(document).delegate("div.UPanel","click",function(i){var h=$(this),j=d.getInstance(h);if(j&&j.isClickClose()){i.stopPropagation()}});$(document).on("click",function(h){if(d.ignoreClick){return}$("div.UPanel").each(function(){var i=$(this),j=d.getInstance(i);if(j&&j.isClickClose()&&j.layout()&&j.layout().is(":visible")){j.hide();j.close()}})});$(document).on("keyup",function(h){var i=h.keyCode;switch(i){case 27:JC.hideAllPanel(1);break}});var e={alert:null,confirm:null,msgbox:null,"dialog.alert":null,"dialog.confirm":null,"dialog.msgbox":null,panel:null,dialog:null};$(document).on("click",function(i){var j=$(i.target||i.srcElement),w=j.attr("paneltype"),q=j.attr("panelmsg"),s=j.is("[panelmsgbox]")?JC.f.parentSelector(j,j.attr("panelmsgbox")):null;if(!(w&&(q||(s&&s.length)))){return}w=w.toLowerCase();if(!w in e){return}j.prop("nodeName")&&j.prop("nodeName").toLowerCase()=="a"&&i.preventDefault();var n,h=(parseInt(j.attr("panelstatus"),10)||0),x=j.attr("panelcallback"),u=j.attr("panelcancelcallback"),v=j.attr("panelclosecallback"),l=parseInt(j.attr("panelbutton"),10)||0,k=j.attr("panelheader")||"",m=j.is("[panelheaderbox]")?JC.f.parentSelector(j,j.attr("panelheaderbox")):null,p=j.attr("panelfooter")||"",t=j.is("[panelfooterbox]")?JC.f.parentSelector(j,j.attr("panelfooterbox")):null,o=j.is("[panelhideclose]")?JC.f.parseBool(j.attr("panelhideclose")):false;s&&(q=JC.f.scriptContent(s)||q);m&&m.length&&(k=JC.f.scriptContent(m)||p);t&&t.length&&(p=JC.f.scriptContent(t)||p);j.prop("nodeName")&&j.prop("nodeName").toLowerCase()=="a"&&i.preventDefault();x&&(x=window[x]);v&&(v=window[v]);switch(w){case"alert":JC.alert&&(n=JC.alert(q,j,h));break;case"confirm":JC.confirm&&(n=JC.confirm(q,j,h));break;case"msgbox":JC.msgbox&&(n=JC.msgbox(q,j,h));break;case"dialog.alert":JC.Dialog&&JC.Dialog.alert&&(n=JC.Dialog.alert(q,h));break;case"dialog.confirm":JC.Dialog&&JC.Dialog.confirm&&(n=JC.Dialog.confirm(q,h));break;case"dialog.msgbox":JC.Dialog&&JC.Dialog.msgbox&&(n=JC.Dialog.msgbox(q,h));break;case"panel":case"dialog":var r="";if(w=="panel"){n=new d(k,q+d._getButton(l),p)}else{if(!JC.Dialog){return}n=JC.Dialog(k,q+d._getButton(l),p)}n.on("beforeshow",function(y,z){!k&&z.find("div.hd").hide();!k&&z.find("div.ft").hide();d._fixWidth(q,n);o&&z.find("span.close").hide()});w=="panel"&&n.show(j,"top");break}if(!n){return}if(/msgbox/i.test(w)){x&&n.on("close",x)}else{x&&n.on("confirm",x)}v&&n.on("close",v);u&&n.on("cancel",u);n.triggerSelector(j)});return JC.Panel})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));(function(b,a){b(["JC.Panel.default"],function(){JC.msgbox=function(i,h,g,f,e){if(typeof h=="number"){g=h;h=null}if(typeof f=="number"){e=f;f=null}var d=c.popup(JC.msgbox.tpl||c.tpls.msgbox,i,h,g);f&&d.on("close",f);setTimeout(function(){d.autoClose(e)},1);return d};JC.msgbox.tpl;JC.alert=function(g,f,e,d){if(typeof f=="number"){e=f;f=null}return c.popup(JC.alert.tpl||c.tpls.alert,g,f,e,d)};JC.alert.tpl;JC.confirm=function(i,h,g,f,d){if(typeof h=="number"){g=h;h=null}var e=c.popup(JC.confirm.tpl||c.tpls.confirm,i,h,g,f);e&&d&&e.on("cancel",d);return e};JC.confirm.tpl;var c={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(e){var d;if(!e){$("body > div.UPanelPopup_identifer").each(function(){var f=$(this),g=Panel.getInstance(f);if(!g){return}g.hide();g.close()});$("body > div.UPanel_TMP").remove()}else{e.selector().addClass("UPanelPopup_identifer");e.selector().data("PopupInstance",e)}},popup:function(e,i,h,g,f){if(!i){return}c.popupIdentifier();h&&(h=$(h));var e=e.replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(g||""));var d=new JC.Panel(e);c.popupIdentifier(d);d.selector().data("popupSrc",h);c.fixWidth(i,d);f&&d.on("confirm",f);if(!h){d.center()}d.on("show_default",function(){if(h&&h.length){c.showEffect(d,h,function(){d.focusButton()});return false}});d.on("close_default",function(){if(h&&h.length){c.hideEffect(d,h,function(){d.selector().remove();d=null})}else{d.selector().remove()}return false});d.on("hide_default",function(){if(h&&h.length){c.hideEffect(d,h,function(){d.selector().hide()});return false}else{d.selector().hide()}});if(h&&h.length){d.selector().css({left:"-9999px",top:"-9999px"})}d.selector().css("z-index",window.ZINDEX_COUNT++);d.show();return d},hideEffect:function(e,g,f){g&&(g=$(g));if(!(g&&g.length)){f&&f(e);return}if(!(e&&e.selector)){return}var m=g.offset(),h=e.selector();var j=h[0];j.interval&&clearInterval(j.interval);j.defaultWidth&&h.width(j.defaultWidth);j.defaultHeight&&h.height(j.defaultHeight);var i=g.width(),d=h.height();j.defaultWidth=h.width();j.defaultHeight=h.height();var l=c.getLeft(m.left,i,h.width());var k=c.getTop(m.top,g.height(),d);k=k-d-c.yoffset;h.height(0);h.css({left:l+"px"});j.interval=JC.f.easyEffect(function(n,o){h.css({top:k+n+"px",height:d-n+"px"});if(g&&!g.is(":visible")){clearInterval(j.interval);f&&f(e)}if(d===n){h.hide()}o&&f&&f(e)},d)},showEffect:function(e,g,f){g&&(g=$(g));if(!(g&&g.length)){return}if(!(e&&e.selector)){return}var m=g.offset(),h=e.selector();var j=h[0];j.interval&&clearInterval(j.interval);j.defaultWidth&&h.width(j.defaultWidth);j.defaultHeight&&h.height(j.defaultHeight);var i=g.width(),d=h.height();j.defaultWidth=h.width();j.defaultHeight=h.height();var l=c.getLeft(m.left,i,h.width());var k=c.getTop(m.top,g.height(),d,c.xoffset);h.height(0);h.css({left:l+"px"});if(k>m.top){j.interval=JC.f.easyEffect(function(n,o){h.css({top:k-d-c.yoffset+"px",height:n+"px"});o&&f&&f(e)},d)}else{j.interval=JC.f.easyEffect(function(n,o){h.css({top:k-n-c.yoffset+"px",height:n+"px"});o&&f&&f(e)},d)}},onresize:function(d){if(!d.selector().is(":visible")){return}var g=d.selector(),e=g.data("popupSrc");if(!(e&&e.length)){d.center()}else{var h=e.offset();var m=h.top,p=e.height(),k=g.height(),o=0,f=h.left,i=e.width(),l=g.width(),j=0;var q=c.getLeft(f,i,l,j)+c.xoffset;var n=c.getTop(m,p,k,o)-k-c.yoffset;g.css({left:q+"px",top:n+"px"})}},getTop:function(i,g,d,f){var j=i,h=$(document).scrollTop(),e=$(window).height()-d;j-d<h&&(j=i+g+d+f);return j},getLeft:function(h,g,j,f){f==undefined&&(f=5);var i=h+g/2+f-j/2,e=$(document).scrollLeft(),d=$(window).width()+e-j;i>d&&(i=d-2);i<e&&(i=e+1);return i},fixWidth:function(g,f){var e=$('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+g+"</div>").appendTo("body"),d=e.width()+80;e.remove();d>c.maxWidth&&(d=c.maxWidth);d<c.minWidth&&(d=c.minWidth);f.selector().css("width",d)},getStatusClass:function(d){var e="UPanelSuccess";switch(d){case 0:e="UPanelSuccess";break;case 1:e="UPanelError";break;case 2:e="UPanelAlert";break}return e},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};$(window).on("resize",function(d){$("body > div.UPanelPopup_identifer").each(function(){var e=$(this);e.data("PopupInstance")&&c.onresize(e.data("PopupInstance"))})});return JC.Panel})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));(function(b,a){b(["JC.Panel.default"],function(){var e=!!window.ActiveXObject&&!window.XMLHttpRequest;var c=window.Dialog=JC.Dialog=function(f,i,j,h){if(d.timeout){clearTimeout(d.timeout)}if(JC.Panel.getInstance(f)){d.timeout=setTimeout(function(){JC.Panel.getInstance(f).show(0)},d.showMs);return JC.Panel.getInstance(f)}d.dialogIdentifier();var g=new JC.Panel(f,i,j,h);d.dialogIdentifier(g);d.showMask();g.selector().css("z-index",window.ZINDEX_COUNT++);g.on("close_default",function(k,l){d.hideMask()});g.on("hide_default",function(k,l){d.hideMask()});g.on("show_default",function(k,l){d.showMask();setTimeout(function(){d.showMask();g.selector().css({"z-index":window.ZINDEX_COUNT++,display:"block"})},1)});d.timeout=setTimeout(function(){g.show(0)},d.showMs);return g};JC.Dialog.mask=function(f){!f&&d.showMask();f&&d.hideMask()};var d={timeout:null,showMs:10,dialogIdentifier:function(f){if(!f){d.hideMask();$("body > div.UPanelDialog_identifer").each(function(){var g=$(this),h=Panel.getInstance(g);if(!h){return}h.hide();h.close()});$("body > div.UPanel_TMP").remove()}else{f.selector().addClass("UPanelDialog_identifer");f.selector().data("DialogInstance",f)}},showMask:function(){var g=$("#UPanelMask"),f=$("#UPanelMaskIfrmae");if(!g.length){$(d.tpls.mask).appendTo("body");g=$("#UPanelMask"),f=$("#UPanelMaskIfrmae")}f.show();g.show();d.setMaskSizeForIe6();f.css("z-index",window.ZINDEX_COUNT++);g.css("z-index",window.ZINDEX_COUNT++)},hideMask:function(){var g=$("#UPanelMask"),f=$("#UPanelMaskIfrmae");if(g.length){g.hide()}if(f.length){f.hide()}},setMaskSizeForIe6:function(){var h=$("#UPanelMask"),g=$("#UPanelMaskIfrmae");if(!(h.length&&g.length)){return}var f={position:"absolute",top:"0px",left:$(document).scrollLeft()+"px",height:$(document).height()+"px",width:$(window).width()+"px"};h.css(f);g.css(f)},tpls:{mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};$(window).on("resize scroll",function(f){$("body > div.UPanelDialog_identifer").each(function(){var g=$(this);if(g.data("DialogInstance")){if(!g.data("DialogInstance").selector().is(":visible")){return}if(f.type.toLowerCase()=="resize"){g.data("DialogInstance").center()}d.setMaskSizeForIe6()}})});return JC.Dialog})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));(function(b,a){b(["JC.Dialog"],function(){JC.Dialog.msgbox=function(i,h,g,f){if(!i){return}var e=(JC.Dialog.msgbox.tpl||c.tpls.msgbox).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var d=JC.Dialog(e);c.fixWidth(i,d);g&&d.on("close",g);setTimeout(function(){d.autoClose(f)},1);return d};JC.Dialog.msgbox.tpl;JC.Dialog.alert=function(h,g,f){if(!h){return}var e=(JC.Dialog.alert.tpl||c.tpls.alert).replace(/\{msg\}/g,h).replace(/\{status\}/g,c.getStatusClass(g||""));var d=JC.Dialog(e);c.fixWidth(h,d);f&&d.on("confirm",f);return d};JC.Dialog.alert.tpl;JC.Dialog.confirm=function(i,h,g,d){if(!i){return}var f=(JC.Dialog.confirm.tpl||c.tpls.confirm).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var e=JC.Dialog(f);c.fixWidth(i,e);g&&e.on("confirm",g);d&&e.on("cancel",d);return e};JC.Dialog.confirm.tpl;var c={minWidth:180,maxWidth:500,getStatusClass:function(d){var e="UPanelSuccess";switch(d){case 0:e="UPanelSuccess";break;case 1:e="UPanelError";break;case 2:e="UPanelAlert";break}return e},fixWidth:function(g,f){var e=$('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+g+"</div>").appendTo("body"),d=e.width()+80;d>c.maxWidth&&(d=c.maxWidth);d<c.minWidth&&(d=c.minWidth);f.selector().css("width",d)},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};return JC.Dialog})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));